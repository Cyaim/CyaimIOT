import { filter } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  CollectConfigModel,
  SerialPortConfig,
  ParityEnum,
  StopBitsEnum,
  CollectCommand,
  ModbusCollectCommand,
  ModbusFunctionEnum,
} from 'src/app/models/CollectConfigModel';
import { EnumType } from 'typescript';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      taskID: number;
      delTaskIds: number[];
      delTaskIdCount: number;
    }
  ) {
    console.log(data);

    //加载串口号
  }

  ngOnInit(): void {
    if (this.data.taskID > -1) {
      // 请求数据
    }
  }

  coms: string[] = ['COM6'];
  handlers: { Name: string; Value: any }[] = [{ Name: '温湿度', Value: '1' }];

  serialConfig: SerialPortConfig = {
    PortName: 'COM6',
    BaudRate: 9600,
    Parity: '0',
    DataBits: 8,
    StopBits: '1',
  };

  collectCmd: ModbusCollectCommand = {
    CommunicationStandard: 'modbus',
    IsWrite: false,
    RunScriptID: '',
    IsCallHandler: false,
    State: undefined,
    Cron: '',

    SlaveID: 1,
    FunctionID: '3',
    StartAddress: 0,
    NumberOfPoints: 0,
    Value: [],
    Data: [],
  };

  collectConfig: CollectConfigModel = {
    TransportMode: 'serialport',
    TransportConfig: this.serialConfig,
    CollectCommand: { '0': this.collectCmd },
  };

  // 在init之前就已经有数据
  parity: { Name: string; Value: any }[] = this.getEnumKV(ParityEnum);

  stopBits: { Name: string; Value: any }[] = this.getEnumKV(StopBitsEnum);

  modbusFunction: { Name: string; Value: any }[] =
    this.getEnumKV(ModbusFunctionEnum);

  hasDataValueError = true;

  getEnumKV(EnumType: any): { Name: string; Value: any }[] {
    let p: any[] = [];

    for (const key in EnumType) {
      if (isNaN(Number(key))) {
        break;
      }
      if (Object.prototype.hasOwnProperty.call(EnumType, key)) {
        const element = EnumType[key];
        p.push({ Name: element, Value: key });
      }
    }

    return p;
  }

  functionChange(e: any) {
    switch (this.collectCmd.FunctionID) {
      case '5':
      case '6':
      case '10':
      case '15':
        this.collectCmd.IsWrite = true;
        break;

      default:
        this.collectCmd.IsWrite = false;
        break;
    }
  }

  writeData: string = '';

  writeDataChange(e: any) {
    let datas: any = e.split(',');
    if (datas.length < 1) {
      this.hasDataValueError = true;
      return;
    }
    this.collectCmd.Data = [];
    this.collectCmd.Value = [];
    //Value 写第一个
    switch (this.collectCmd.FunctionID) {
      case '5':
        {
          if (datas[0] === 't' || datas[0] === 'f') {
            let d: boolean = datas[0] === 't';
            this.collectCmd.Value[0] = d;

            this.hasDataValueError = false;
          }
        }
        break;
      case '15':
        {
          for (const key in datas) {
            if (Object.prototype.hasOwnProperty.call(datas, key)) {
              const element = datas[key];
              if (element === 't' || element === 'f') {
                let d: boolean = element === 't';
                this.collectCmd.Value.push(d);
                this.hasDataValueError = false;
              }
            }
          }
        }
        break;
      case '6':
        {
          if (!isNaN(datas[0])) {
            let d: number = datas[0];
            this.collectCmd.Data[0] = d;
            this.hasDataValueError = false;
          }
        }
        break;
      case '10':
        {
          for (const key in datas) {
            if (Object.prototype.hasOwnProperty.call(datas, key)) {
              const element = datas[key];
              if (!isNaN(element)) {
                let d: number = element;
                this.collectCmd.Data.push(d);
                this.hasDataValueError = false;
              }
            }
          }
        }
        break;
      default:
        break;
    }

    datas = [];
    console.log(e);
  }
}
