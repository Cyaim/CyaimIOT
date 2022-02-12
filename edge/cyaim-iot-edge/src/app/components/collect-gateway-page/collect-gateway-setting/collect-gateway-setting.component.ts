import { EditTaskComponent } from './edit-task/edit-task.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface LogModel {
  id: number;
  event: string;
  describe: string;
  date: string;
}

const ELEMENT_DATA: LogModel[] = [
  { id: 1, event: 'Hydrogen', describe: '', date: '2022-02-07 11:11:11' },
  { id: 2, event: 'Helium', describe: '', date: '2022-02-07 11:11:11' },
  { id: 3, event: 'Lithium', describe: '', date: '2022-02-07 11:11:11' },
  { id: 4, event: 'Beryllium', describe: '', date: '2022-02-07 11:11:11' },
  { id: 5, event: 'Boron', describe: '', date: '2022-02-07 11:11:11' },
  { id: 6, event: 'Carbon', describe: '', date: '2022-02-07 11:11:11' },
  {
    id: 7,
    event: 'Nitrogen',
    describe: '14.0067',
    date: '2022-02-07 11:11:11',
  },
  { id: 8, event: 'Oxygen', describe: '', date: '2022-02-07 11:11:11' },
  { id: 9, event: 'Fluorine', describe: '', date: '2022-02-07 11:11:11' },
  { id: 10, event: 'Neon', describe: '', date: '2022-02-07 11:11:11' },
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
  selector: 'app-collect-gateway-setting',
  templateUrl: './collect-gateway-setting.component.html',
  styleUrls: ['./collect-gateway-setting.component.scss'],
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
export class CollectGatewaySettingComponent implements OnInit {
  displayedColumns: string[] = ['select', 'event', 'date', 'describe'];
  dataSource = new MatTableDataSource<LogModel>(ELEMENT_DATA);

  pageSetting = PAGE_SETTING_DATA;

  selection = new SelectionModel<LogModel>(true, []);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  /**
   * Whether the number of selected elements matches the total number of rows.
   *
   * 所选元素的数量是否与总行数匹配。
   *
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   *
   * 如果没有全部选中，则选择所有行；否则明确选择。
   *
   */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /**
   * The label for the checkbox on the passed row
   *
   * 传递行上复选框的标签
   *
   */
  checkboxLabel(row?: LogModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  editTask(taskIds: number[]) {
    let index: number = 0;

    this.openEdit(taskIds, index);
  }

  openEdit(taskIds: number[], index: number) {
    console.log(taskIds, index);
    const dialogResult = this.dialog.open(EditTaskComponent, {
      data: { taskID: taskIds[index] },
      disableClose: true,
    });
    dialogResult.afterClosed().subscribe((r) => {
      if (++index < taskIds.length) {
        this.openEdit(taskIds, index);
      } else {
      }
    });
  }

  delEdit(taskIds: number[]) {
    const dialogResult = this.dialog.open(EditTaskComponent, {
      data: { delTaskIds: taskIds, delTaskIdCount: taskIds.length },
    });
    dialogResult.afterClosed().subscribe((r) => {
      // 更新Datasource
    });
  }

  getAllSelectionId(): number[] {
    return this.selection.selected.map((x) => {
      return x.id;
    });
  }
}
