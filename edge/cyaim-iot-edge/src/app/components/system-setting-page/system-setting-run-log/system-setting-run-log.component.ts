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
  num: number;
  event: string;
  describe: string;
  date: string;
}

const ELEMENT_DATA: LogModel[] = [
  { num: 1, event: 'Hydrogen', describe: '', date: '2022-02-07 11:11:11' },
  { num: 2, event: 'Helium', describe: '', date: '2022-02-07 11:11:11' },
  { num: 3, event: 'Lithium', describe: '', date: '2022-02-07 11:11:11' },
  { num: 4, event: 'Beryllium', describe: '', date: '2022-02-07 11:11:11' },
  { num: 5, event: 'Boron', describe: '', date: '2022-02-07 11:11:11' },
  { num: 6, event: 'Carbon', describe: '', date: '2022-02-07 11:11:11' },
  {
    num: 7,
    event: 'Nitrogen',
    describe: '14.0067',
    date: '2022-02-07 11:11:11',
  },
  { num: 8, event: 'Oxygen', describe: '', date: '2022-02-07 11:11:11' },
  { num: 9, event: 'Fluorine', describe: '', date: '2022-02-07 11:11:11' },
  { num: 10, event: 'Neon', describe: '', date: '2022-02-07 11:11:11' },
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
  selector: 'app-system-setting-run-log',
  templateUrl: './system-setting-run-log.component.html',
  styleUrls: ['./system-setting-run-log.component.scss'],
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
export class SystemSettingRunLogComponent implements OnInit {
  constructor(private _adapter: DateAdapter<any>, private el: ElementRef) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // console.log(
    //   this.el.nativeElement.querySelector('.mat-paginator-page-size-label')
    // );
  }

  displayedColumns: string[] = ['num', 'event', 'describe', 'date'];
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

  chooseDateLang(lang: string) {
    this._adapter.setLocale(lang);
  }
}
