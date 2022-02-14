// See https://aka.ms/new-console-template for more information
using Cyaim.IOT.Edge;
using Cyaim.IOT.Edge.Server;
using System.IO.Ports;

Console.WriteLine("Hello, World!");

// 1、串口信息
// 2、指令信息
// 3、数据处理
// 4、如何执行

CollectConfigDto collectConfig = new CollectConfigDto()
{
    TransportConfig = new Dictionary<int, ITransportConfig>()
                {
                    { 0,new SerialPortConfig("COM9", 9600, Parity.None, 8, StopBits.One)}
                },
    SyncRun = true,
    SyncRunInterval = 300,
    CollectCommand = new Dictionary<int, ICollectCommand>()
                {
                    { 0,new ModbusCollectCommand() { TransportConfigID = 0, SlaveID = 1, CommunicationStandard = "modbus", StartAddress = 0x01, NumberOfPoints = 2, FunctionID = ModbusFunctionEnum.ReadHoldingRegisters, IsCallHandler = false, RunScriptID = "1" }},
                    { 1,new ModbusCollectCommand() { TransportConfigID = 0, SlaveID = 1, CommunicationStandard = "modbus", StartAddress = 0x0A, NumberOfPoints = 2, FunctionID = ModbusFunctionEnum.ReadHoldingRegisters, IsCallHandler = false, RunScriptID = "2" }},
                    { 2,new ModbusCollectCommand() { TransportConfigID = 0, SlaveID = 1, CommunicationStandard = "modbus", StartAddress = 0x11, NumberOfPoints = 3, FunctionID = ModbusFunctionEnum.ReadHoldingRegisters, IsCallHandler = false, RunScriptID = "3" }},
                    { 3,new ModbusCollectCommand() { TransportConfigID = 0, SlaveID = 1, CommunicationStandard = "modbus", StartAddress = 0x15, NumberOfPoints = 2, FunctionID = ModbusFunctionEnum.ReadHoldingRegisters, IsCallHandler = false, RunScriptID = "4" }},
                },
};

HostServer host = new HostServer();

await host.Run(collectConfig);