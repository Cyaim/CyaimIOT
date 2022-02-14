using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Cyaim.IOT.Edge
{
    /// <summary>
    /// 采集配置
    /// </summary>
    public class CollectConfigDto
    {
        public Dictionary<int, ITransportConfig> TransportConfig { get; set; }

        /// <summary>
        /// 是否同步执行，true采集命令中的周期设置为空将会加入同步执行队列
        /// </summary>
        public bool SyncRun { get; set; }

        /// <summary>
        /// 同步执行间隔，毫秒
        /// </summary>
        public int SyncRunInterval { get; set; }

        /// <summary>
        /// 采集命令
        /// </summary>
        public Dictionary<int, ICollectCommand> CollectCommand { get; set; }
    }

    /// <summary>
    /// 串口配置
    /// </summary>
    public class SerialPortConfig : ITransportConfig
    {
        public SerialPortConfig()
        {
        }

        public SerialPortConfig(string portName, int baudRate, Parity parity, int dataBits, StopBits stopBits)
        {
            PortName = portName;
            BaudRate = baudRate;
            Parity = parity;
            DataBits = dataBits;
            StopBits = stopBits;

        }

        public string PortName { get; set; }
        public int BaudRate { get; set; }
        public Parity Parity { get; set; }
        public int DataBits { get; set; }
        public StopBits StopBits { get; set; }
    }


    /// <summary>
    /// TCP配置
    /// </summary>
    public class TcpClientConfig : ITransportConfig
    {
        /// <summary>
        /// A string that contains an IP address in dotted-quad notation for IPv4 and in colon-hexadecimal notation for IPv6.
        /// </summary>
        public string IPAddress { get; set; }
        public int Port { get; set; }
    }

    /// <summary>
    /// 串口配置接口
    /// </summary>
    public interface ITransportConfig { }

    /// <summary>
    /// Modbus采集命令
    /// </summary>
    public class ModbusCollectCommand : ICollectCommand
    {


        /// <summary>
        /// 从机ID
        /// </summary>
        public byte SlaveID { get; set; }

        /// <summary>
        /// 功能码
        /// </summary>
        public ModbusFunctionEnum FunctionID { get; set; }

        /// <summary>
        /// 寄存器起始地址
        /// </summary>
        public ushort StartAddress { get; set; }

        /// <summary>
        /// 寄存器个数
        /// </summary>
        public ushort NumberOfPoints { get; set; }

        /// <summary>
        /// code 5用数组第一个，code 0F写整个数组
        /// </summary>
        public bool[] Value { get; set; }

        /// <summary>
        /// code 6用数组第一个，code 10写整个数组
        /// </summary>
        public ushort[] Data { get; set; }

        public bool IsCallHandler { get; set; }

        public string RunScriptID { get; set; }
        public string Cron { get; set; }
        public string CommunicationStandard { get; set; }
        public int TransportConfigID { get; set; }
        public bool IsWrite { get; set; }
        public object State { get; set; }
    }

    /// <summary>
    /// Modbus 功能码
    /// </summary>
    public enum ModbusFunctionEnum
    {
        /// <summary>
        /// 读取单个线圈
        /// </summary>
        ReadCoils = 1,

        /// <summary>
        /// 读取输入线圈/离散量线圈
        /// </summary>
        ReadDisCreteInputs,

        /// <summary>
        /// 读取保持寄存器
        /// </summary>
        ReadHoldingRegisters,

        /// <summary>
        /// 读取输入寄存器
        /// </summary>
        ReadInputRegisters,

        /// <summary>
        /// 写单个线圈
        /// </summary>
        WriteSingleCoil,

        /// <summary>
        /// 写单个输入线圈/离散量线圈
        /// </summary>
        WriteSingleRegisters,

        /// <summary>
        /// 写一组线圈
        /// </summary>
        WriteMultipleCoils = 0x0F,

        /// <summary>
        /// 写一组保持寄存器
        /// </summary>
        WriteMultipleRegisters = 10,
    }

    /// <summary>
    /// 采集命令接口
    /// </summary>
    public interface ICollectCommand
    {
        /// <summary>
        /// 传输配置，缺省选择第一个传输配置
        /// </summary>
        public int TransportConfigID { get; set; }

        /// <summary>
        /// 传输类型,modbus
        /// </summary>
        public string CommunicationStandard { get; set; }

        /// <summary>
        /// true调用HandlerName,false运行C# Script
        /// </summary>
        public bool IsCallHandler { get; set; }

        ///// <summary>
        ///// 简单数据处理公式
        ///// </summary>
        //public string Formula { get; set; }

        /// <summary>
        /// 是否为写入数据，仅传入处理程序
        /// </summary>
        public bool IsWrite { get; set; }

        /// <summary>
        /// 状态数据，仅传入处理程序
        /// </summary>
        public object State { get; set; }

        /// <summary>
        /// 上传后数据处理脚本的ID
        /// </summary>
        public string RunScriptID { get; set; }

        /// <summary>
        /// 采集周期
        /// </summary>
        public string Cron { get; set; }
    }
}
