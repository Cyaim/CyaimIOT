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
  selector: 'app-edit-handler',
  templateUrl: './edit-handler.component.html',
  styleUrls: ['./edit-handler.component.scss'],
})
export class EditHandlerComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      codeID: number;
      delCodeIds: number[];
      delCodeIdCount: number;
    }
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    if (this.data.codeID > -1) {
      // 请求数据
    }
  }

  code: string = '';
}
