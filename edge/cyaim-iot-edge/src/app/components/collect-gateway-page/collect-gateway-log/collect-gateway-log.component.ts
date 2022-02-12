import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import 'moment/locale/zh-cn';

import { PageEvent } from '@angular/material/paginator';

export interface LogModel {
  id: number;
  type: string;
  data: string;
  date: string;
}

const ELEMENT_DATA: LogModel[] = [
  { id: 1, type: 'Hydrogen', data: '', date: '2022-02-07 11:11:11' },
  { id: 2, type: 'Helium', data: '', date: '2022-02-07 11:11:11' },
  { id: 3, type: 'Lithium', data: '', date: '2022-02-07 11:11:11' },
  { id: 4, type: 'Beryllium', data: '', date: '2022-02-07 11:11:11' },
  { id: 5, type: 'Boron', data: '', date: '2022-02-07 11:11:11' },
  { id: 6, type: 'Carbon', data: '', date: '2022-02-07 11:11:11' },
  {
    id: 7,
    type: 'Nitrogen',
    data: '14.0067',
    date: '2022-02-07 11:11:11',
  },
  { id: 8, type: 'Oxygen', data: '', date: '2022-02-07 11:11:11' },
  { id: 9, type: 'Fluorine', data: '', date: '2022-02-07 11:11:11' },
  { id: 10, type: 'Neon', data: '', date: '2022-02-07 11:11:11' },
];

export interface PageModel {
  pageTotal: number;
  pageSize: number;
  pageSizeOptions: number[];
  pageEvent: PageEvent;
}

const PAGE_SETTING_DATA: PageModel = {
  pageTotal: 100,
  pageSize: 10,
  pageSizeOptions: [10, 25, 100],
  pageEvent: { pageIndex: 0, pageSize: 0, length: 0 },
};

@Component({
  selector: 'app-collect-gateway-log',
  templateUrl: './collect-gateway-log.component.html',
  styleUrls: ['./collect-gateway-log.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-cn' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS,
    },
  ],
})
export class CollectGatewayLogComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  displayedColumns: string[] = ['id', 'type', 'data', 'date'];
  dataSource = ELEMENT_DATA;

  toppings: FormControl = new FormControl();
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  logEventForm = new FormGroup({
    event: new FormControl(),
    start: new FormControl(),
    end: new FormControl(),
  });

  pageSetting = PAGE_SETTING_DATA;
}
