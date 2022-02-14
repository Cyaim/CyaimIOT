using Cyaim.IOT.Edge.Common;
using Cyaim.IOT.Edge.Models;
using Cyaim.WebSocketServer.Infrastructure.Handlers.MvcHandler;
using Newtonsoft.Json;
using NModbus;
using NModbus.Serial;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO.Ports;
using System.Linq;
using System.Net.NetworkInformation;
using System.Net.WebSockets;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Websocket.Client;

namespace Cyaim.IOT.Edge.Server
{
    public class HostServer
    {
        public async Task Run(CollectConfigDto collectConfigDto)
        {
            await UploadSystemInfo();

            await LinkServer("wss://", async (response) =>
            {
                if (response.MessageType != WebSocketMessageType.Text)
                {
                    return;
                }

                // 服务端向客户端发送消息
                MvcRequestScheme request = JsonConvert.DeserializeObject<MvcRequestScheme>(response.Text);

                switch (request.Target)
                {
                    // 身份验证挑战
                    case "Client.AuthChallenge":
                        {
                            //request.Body.
                        }
                        break;
                    // 服务端下发采集配置
                    case "Client.DeployCollectConfig":
                        {
                            try
                            {
                                CollectConfigDto config = JsonConvert.DeserializeObject<CollectConfigDto>(request.Body.ToString(), GlobalData.JsonSerializerSettings);

                                await File.WriteAllTextAsync(@"./collect.config", JsonConvert.SerializeObject(config, GlobalData.JsonSerializerSettings));
                            }
                            catch (Exception ex)
                            {
                                MvcRequestScheme scheme = new MvcRequestScheme()
                                {
                                    Id = request.Id,
                                    Target = "$Client.DeployCollectConfig",
                                    Body = ex
                                };

                                await GlobalData.WebsocketClient.SendInstant(JsonConvert.SerializeObject(scheme, GlobalData.JsonSerializerSettings));
                            }
                        }
                        break;
                    // 服务端下发网络配置
                    case "Client.DeployNetworkConfig":
                        {

                        }
                        break;
                    // 服务端查询本地数据库
                    case "Client.QueryLocalData":
                        {
                            try
                            {
                                string sql = request.Body as string;

                                List<dynamic> data = await Log.DB.Ado.SqlQueryAsync<dynamic>(sql);

                                MvcRequestScheme scheme = new MvcRequestScheme()
                                {
                                    Id = request.Id,
                                    Target = "$Client.QueryLocalData",
                                    Body = data
                                };

                                await GlobalData.WebsocketClient.SendInstant(JsonConvert.SerializeObject(scheme, GlobalData.JsonSerializerSettings));
                            }
                            catch (Exception ex)
                            {
                                MvcRequestScheme scheme = new MvcRequestScheme()
                                {
                                    Id = request.Id,
                                    Target = "$Client.QueryLocalData",
                                    Body = ex
                                };

                                await GlobalData.WebsocketClient.SendInstant(JsonConvert.SerializeObject(scheme, GlobalData.JsonSerializerSettings));
                            }


                        }
                        break;
                    // 服务端发送命令
                    case "Client.ExecuteCommand":
                        {
                            ExecuteCommandDto cmd = request.Body as ExecuteCommandDto;
                            //创建一个ProcessStartInfo对象 使用系统shell 指定命令和参数 设置标准输出
                            var psi = new ProcessStartInfo(cmd.FileName, cmd.Arguments) { RedirectStandardOutput = true };
                            //启动
                            var proc = Process.Start(psi);

                            MvcRequestScheme scheme = new MvcRequestScheme()
                            {
                                Id = request.Id,
                                Target = "$Client.ExecuteCommand",
                            };

                            if (proc == null)
                            {
                                scheme.Body = "启动进程失败，Process为null";
                                await GlobalData.WebsocketClient.SendInstant(JsonConvert.SerializeObject(scheme, GlobalData.JsonSerializerSettings));
                            }
                            else
                            {
                                Console.WriteLine("-------------Start read standard output--------------");
                                //开始读取
                                using (var sr = proc.StandardOutput)
                                {
                                    while (!sr.EndOfStream)
                                    {
                                        scheme.Body = sr.ReadLine();
                                        await GlobalData.WebsocketClient.SendInstant(JsonConvert.SerializeObject(scheme, GlobalData.JsonSerializerSettings));
                                    }

                                    if (!proc.HasExited)
                                    {
                                        proc.Kill();
                                    }
                                }
                                Console.WriteLine("---------------Read end------------------");

                                scheme.Body = $@"Exited Code ： {proc.ExitCode}
            Total execute time :{(proc.ExitTime - proc.StartTime).TotalMilliseconds} ms";
                                await GlobalData.WebsocketClient.SendInstant(JsonConvert.SerializeObject(scheme, GlobalData.JsonSerializerSettings));
                            }


                        }
                        break;
                    default:
                        break;
                }
            });

            await LoadCollect(collectConfigDto);
            await RunCollect();


        }

        /// <summary>
        /// 运行采集
        /// </summary>
        /// <returns></returns>
        public async Task RunCollect()
        {
            while (true)
            {
                while (!GlobalData.InitComplated)
                {
                    Thread.Sleep(1);
                }

                // 顺序采集
                if (GlobalData.CollectConfig.SyncRun)
                {
                    await Task.Run(async () =>
                    {
                        Stopwatch time = new Stopwatch();
                        // 顺序执行采集任务。    是否有必要合并同端口采集任务？
                        foreach (var item in GlobalData.CollectConfig.CollectCommand.Where(x => GlobalData.Coms.Values.Contains(x.Value.TransportConfigID)))
                        {
                            SerialPort serialPort = GlobalData.Coms.FirstOrDefault(x => x.Value == item.Value.TransportConfigID).Key;
                            time.Restart();
                            DateTimeOffset now = DateTimeOffset.Now;
                            var collectData = await RunCollect(serialPort, item.Value);

                            // 数据处理
                            SqlSugarClient db = new SqlSugarClient(new ConnectionConfig()
                            {
                                ConnectionString = GlobalData.ConnectionString,
                                DbType = DbType.Sqlite,
                                IsAutoCloseConnection = true,

                            });
                            HandlerScripts script = await db.Queryable<HandlerScripts>().FirstAsync(x => x.ID == item.Value.RunScriptID);
                            if (script == null)
                            {
                                Log.Warning("处理程序空");
                                continue;
                            }

                            Assembly assembly = null;
                            byte[] assemblyCode = null;
                            if (item.Value.IsCallHandler || !string.IsNullOrEmpty(script.DLLPath))
                            {
                                try
                                {
                                    string relativePath = Path.GetRelativePath(Environment.CurrentDirectory, script.DLLPath);
                                    script.DLLPath = Path.Combine(Environment.CurrentDirectory, relativePath);
                                    assembly = Assembly.LoadFile(script.DLLPath);
                                }
                                catch (Exception ex)
                                {
                                    Log.Warning(ex);

                                    if (string.IsNullOrEmpty(script.Script))
                                    {
                                        Log.Warning("尝试编译的处理程序代码为空");
                                        continue;
                                    }

                                    assembly = GenerateCodeHelper.GenerateAssemblyFromCode(null, out assemblyCode, script.Script);
                                    if (assembly == null)
                                    {
                                        Log.Warning("尝试使用代码进行编译出现错误");
                                        continue;
                                    }
                                }
                            }
                            else
                            {
                                assembly = GenerateCodeHelper.GenerateAssemblyFromCode(null, out assemblyCode, script.Script);
                            }

                            if (assembly == null)
                            {
                                continue;
                            }
                            Type type = assembly.GetTypes().FirstOrDefault(x => x.FullName.Contains("Cyaim.IOT.Edge.Handlers."));
                            if (type == null)
                            {
                                Log.Warning("加载的程序集中无可用的处理程序");
                                continue;
                            }

                            IDataHandler obj = (IDataHandler)Activator.CreateInstance(type);

                            DataConverted data = obj.Invoke(now, collectData.CoilsData, collectData.RegisterData, item.Value.IsWrite, item.Value.State);
                            foreach (var collItem in data.Data)
                            {
                                int i = await db.Insertable(new CollectDatas()
                                {
                                    Date = data.Date.UtcDateTime,
                                    ID = Guid.NewGuid().ToString("N"),
                                    Source = serialPort.PortName,
                                    Name = collItem.Key,
                                    Value = collItem.Value.ToString()
                                }).ExecuteCommandAsync();
                                if (i < 1)
                                {
                                    Log.Error("数据采集入库失败", JsonConvert.SerializeObject(data));
                                }
                            }

                            // 代码不为空表示尝试了进行代码编译
                            if (assemblyCode != null)
                            {
                                script.DLLPath = @$"./Temps/dlls/{assembly.ManifestModule.ScopeName}";

                                await File.WriteAllBytesAsync(script.DLLPath, assemblyCode);

                                await db.Updateable(script).ExecuteCommandAsync();
                            }

                            time.Stop();
                            int runtime = GlobalData.CollectConfig.SyncRunInterval - (int)time.ElapsedMilliseconds;
                            Thread.Sleep(runtime <= 0 ? 0 : runtime);
                        }

                    });
                }
                else
                {
                    // 并行采集，计划中暂不实现
                }
            }

        }

        /// <summary>
        /// 加载配置
        /// </summary>
        /// <param name="collectConfig"></param>
        /// <returns></returns>
        public async Task LoadCollect(CollectConfigDto collectConfig)
        {
            GlobalData.InitComplated = false;
            try
            {
                if (collectConfig == null)
                {
                    Log.Warning("无采集配置");

                    GlobalData.InitComplated = true;
                    return;
                }

                // 1、检查传输配置

                // Key 串口对象，Value TransportConfigID
                Dictionary<SerialPort, int> coms = new Dictionary<SerialPort, int>();

                int firstConfigId = -1;

                // 所有命令使用到的ConfigID
                int[] cmdTransportConfigIds = collectConfig.CollectCommand.Select(x => x.Value.TransportConfigID).ToArray();

                // 命令用的传输配置，在配置文件中不存在
                var nonTransportConfigIds = cmdTransportConfigIds.Except(collectConfig.TransportConfig.Keys);
                foreach (var item in nonTransportConfigIds)
                {
                    Log.Warning($"指令使用传输配置ID：{item} 在传输配置中不存在");
                }

                //只初始化命令用到的传输配置
                foreach (var item in collectConfig.TransportConfig.Where(x => cmdTransportConfigIds.Contains(x.Key)))
                {
                    if (item.Value == null)
                    {
                        continue;
                    }
                    switch (item.Value)
                    {
                        case SerialPortConfig:
                            {
                                string[] ports = SerialPort.GetPortNames();
                                SerialPortConfig serialPortConfig = item.Value as SerialPortConfig;
                                if (!ports.Any(x => x == serialPortConfig.PortName))
                                {
                                    Log.Warning("配置文件端口在本机不存在");
                                    continue;
                                }

                                SerialPort port = new(serialPortConfig.PortName, serialPortConfig.BaudRate, serialPortConfig.Parity, serialPortConfig.DataBits, serialPortConfig.StopBits);
                                try
                                {
                                    port.Open();

                                    bool isSucc = coms.TryAdd(port, item.Key);
                                    if (!isSucc)
                                    {
                                        Log.Warning($"{serialPortConfig.PortName}端口校验失败");
                                    }
                                    if (firstConfigId == -1)
                                    {
                                        firstConfigId = item.Key;
                                    }
                                }
                                catch (Exception ex)
                                {
                                    port = null;
                                    Log.Error(ex);
                                }



                            }
                            break;
                        case TcpClientConfig:
                            {

                            }
                            break;
                        default:
                            break;
                    }


                }

                // 缺省使用第一个传输配置
                if (firstConfigId != -1)
                {
                    foreach (var item in collectConfig.CollectCommand)
                    {
                        bool hasExist = coms.Any(x => x.Value == item.Value.TransportConfigID);
                        if (!hasExist)
                        {
                            item.Value.TransportConfigID = firstConfigId;
                        }
                    }
                }


                GlobalData.CollectConfig = collectConfig;
                GlobalData.Coms = coms;

                await File.WriteAllTextAsync($@"./collect.config", JsonConvert.SerializeObject(collectConfig, Formatting.Indented, GlobalData.JsonSerializerSettings));
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                GlobalData.InitComplated = true;
            }

        }

        public async Task<(ushort[] RegisterData, bool[] CoilsData)> RunCollect(SerialPort com, ICollectCommand collectCommand)
        {
            switch (collectCommand)
            {
                case ModbusCollectCommand:
                    {
                        ModbusFactory factory = new();

                        using (com)
                        using (IModbusSerialMaster master = factory.CreateRtuMaster(com))
                        {
                            if (!com.IsOpen)
                            {
                                com.Open();
                            }

                            ModbusCollectCommand modbusCollect = collectCommand as ModbusCollectCommand;
                            byte slaveId = modbusCollect.SlaveID;//当前设备的地址

                            bool[] coilsBuffer = null;
                            ushort[] returnData = null;
                            switch (modbusCollect.FunctionID)
                            {
                                case ModbusFunctionEnum.ReadCoils://读取单个线圈
                                    {
                                        coilsBuffer = await master.ReadCoilsAsync(slaveId, modbusCollect.StartAddress, modbusCollect.NumberOfPoints);
                                    }
                                    break;
                                case ModbusFunctionEnum.ReadDisCreteInputs://读取输入线圈/离散量线圈
                                    {
                                        coilsBuffer = await master.ReadInputsAsync(slaveId, modbusCollect.StartAddress, modbusCollect.NumberOfPoints);
                                    }
                                    break;
                                case ModbusFunctionEnum.ReadHoldingRegisters://读取保持寄存器
                                    {
                                        returnData = await master.ReadHoldingRegistersAsync(slaveId, modbusCollect.StartAddress, modbusCollect.NumberOfPoints);
                                    }
                                    break;
                                case ModbusFunctionEnum.ReadInputRegisters://读取输入寄存器
                                    {
                                        returnData = await master.ReadInputRegistersAsync(slaveId, modbusCollect.StartAddress, modbusCollect.NumberOfPoints);
                                    }
                                    break;
                                case ModbusFunctionEnum.WriteSingleCoil://写单个线圈
                                    {
                                        await master.WriteSingleCoilAsync(slaveId, modbusCollect.StartAddress, modbusCollect.Value[0]);
                                    }
                                    break;
                                case ModbusFunctionEnum.WriteSingleRegisters://写单个输入线圈/离散量线圈
                                    {
                                        await master.WriteSingleRegisterAsync(slaveId, modbusCollect.StartAddress, modbusCollect.Data[0]);
                                    }
                                    break;
                                case ModbusFunctionEnum.WriteMultipleCoils://写一组线圈
                                    {
                                        await master.WriteMultipleCoilsAsync(slaveId, modbusCollect.StartAddress, modbusCollect.Value);
                                    }
                                    break;
                                case ModbusFunctionEnum.WriteMultipleRegisters:// 写一组保持寄存器
                                    {
                                        await master.WriteMultipleRegistersAsync(slaveId, modbusCollect.StartAddress, modbusCollect.Data);
                                    }
                                    break;
                                default:
                                    break;
                            }

                            return (returnData, coilsBuffer);
                        }

                    }
                    break;
                default:
                    break;
            }

            return (null, null);
        }


        public async Task LinkServer(string wsurl, Action<ResponseMessage> receivedCallback)
        {
            ManualResetEvent exitEvent = new ManualResetEvent(false);
            var url = new Uri(wsurl);

            GlobalData.WebsocketClient = new WebsocketClient(url);

            GlobalData.WebsocketClient.ReconnectTimeout = TimeSpan.FromSeconds(10);
            GlobalData.WebsocketClient.ReconnectionHappened.Subscribe(info =>
                Log.Information($"Reconnection happened, type: {info.Type}"));

            GlobalData.WebsocketClient.MessageReceived.Subscribe(receivedCallback);
            await GlobalData.WebsocketClient.Start();

            //await Task.Run(() => GlobalData.WebsocketClient.Send("{ message }"));

            exitEvent.WaitOne();
        }

        /// <summary>
        /// 上传系统信息
        /// </summary>
        /// <returns></returns>
        public async Task UploadSystemInfo()
        {
            ManualResetEvent exitEvent = new ManualResetEvent(false);

            await Task.Run(async () =>
            {
                while (true)
                {
                    #region 网络接口配置

                    NetworkInterface[] adapters = NetworkInterface.GetAllNetworkInterfaces();//获取本地计算机上网络接口的对象
                    //Console.WriteLine("适配器个数：" + adapters.Length);
                    List<NetworkInterfaceDto> networks = new();
                    foreach (NetworkInterface adapter in adapters)
                    {
                        //Console.WriteLine("描述：" + adapter.Description);
                        //Console.WriteLine("标识符：" + adapter.Id);
                        //Console.WriteLine("名称：" + adapter.Name);
                        //Console.WriteLine("类型：" + adapter.NetworkInterfaceType);
                        //Console.WriteLine("速度：" + adapter.Speed * 0.001 * 0.001 + "M");
                        //Console.WriteLine("操作状态：" + adapter.OperationalStatus);
                        //Console.WriteLine("MAC 地址：" + adapter.GetPhysicalAddress());

                        // 格式化显示MAC地址                
                        PhysicalAddress pa = adapter.GetPhysicalAddress();//获取适配器的媒体访问（MAC）地址
                        byte[] bytes = pa.GetAddressBytes();//返回当前实例的地址
                        System.Text.StringBuilder sb = new();
                        for (int i = 0; i < bytes.Length; i++)
                        {
                            sb.Append(bytes[i].ToString("X2"));//以十六进制格式化
                            if (i != bytes.Length - 1)
                            {
                                sb.Append("-");
                            }
                        }
                        networks.Add(new NetworkInterfaceDto()
                        {
                            Id = adapter.Id,
                            Description = adapter.Description,
                            MAC = sb.ToString(),
                            Name = adapter.Name,
                            NetworkInterfaceType = adapter.NetworkInterfaceType,
                            OperationalStatus = adapter.OperationalStatus,
                            Speed = adapter.Speed
                        });
                    }

                    MvcRequestScheme request = new MvcRequestScheme()
                    {
                        Id = Guid.NewGuid().ToString("N"),
                        Target = "",
                        Body = networks
                    };

                    await GlobalData.WebsocketClient.SendInstant(JsonConvert.SerializeObject(request));
                    #endregion

                    Thread.Sleep(3000);
                }

            });

            exitEvent.WaitOne();
        }

        public async Task RunCollect(string portName)
        {
            using (SerialPort com = new(portName, 9600, Parity.None, 8, StopBits.One))
            {
                com.Open();

                ModbusFactory factory = new();

                IModbusSerialMaster master = factory.CreateRtuMaster(com);
                byte slaveId = 1;//当前设备的地址为1

                while (true)
                {
                    ushort startAddress = 0x01;
                    ushort num = 2;
                    ushort[] returnData = await master.ReadHoldingRegistersAsync(slaveId, startAddress, num);

                    Console.WriteLine($"湿度：{returnData[1] / (double)10} ℃");
                    Console.WriteLine($"温度：{ returnData[0] / (double)10 }%RH");

                    startAddress = 0x0A;
                    num = 2;
                    returnData = await master.ReadHoldingRegistersAsync(slaveId, startAddress, num);
                    Console.WriteLine($"光照度：{returnData[1] / (double)10} Lux");

                    startAddress = 0x11;
                    num = 3;
                    returnData = await master.ReadHoldingRegistersAsync(slaveId, startAddress, num);
                    Console.WriteLine($"PM1.0：{returnData[0]}  μg/m³");
                    Console.WriteLine($"PM2.5：{returnData[1]}  μg/m³");
                    Console.WriteLine($"PM10：{returnData[2] } μg/m³");

                    startAddress = 0x15;
                    num = 2;
                    returnData = await master.ReadHoldingRegistersAsync(slaveId, startAddress, num);
                    Console.WriteLine($"噪声：{returnData[0] / (double)10} dB");

                    Console.WriteLine();
                }



            }



        }


    }
}
