export interface CollectConfigModel {
  TransportMode: 'serialport' | 'tcp';
  TransportConfig: SerialPortConfig | TcpClientConfig;

  CollectCommand: any;
}

export interface SerialPortConfig {
  PortName: string;
  BaudRate: number;
  Parity: string;
  DataBits: number;
  StopBits: string;
}

export interface TcpClientConfig {
  IPAddress: string;
  Port: number;
}

export enum ParityEnum {
  None = 0,
  Odd,
  Even,
  Mark,
  Space,
}

export enum StopBitsEnum {
  None = 0,
  One,
  Two,
  OnePointFive,
}

export interface CollectCommand {
  CommunicationStandard: string;
  IsCallHandler: boolean;
  IsWrite: boolean;
  State: any;
  RunScriptID: string;
  Cron: string;
}

export interface ModbusCollectCommand extends CollectCommand {
  SlaveID: number;
  FunctionID: string;
  StartAddress: number;
  NumberOfPoints: number;
  Value: boolean[];
  Data: number[];
}

export enum ModbusFunctionEnum {
  ReadCoils = 1,
  ReadDisCreteInputs,
  ReadHoldingRegisters,
  ReadInputRegisters,
  WriteSingleCoil,
  WriteSingleRegisters,
  WriteMultipleCoils = 0x0f,
  WriteMultipleRegisters = 10,
}
