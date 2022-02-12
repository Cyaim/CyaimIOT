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
import { EditHandlerComponent } from './edit-handler/edit-handler.component';

export interface LogModel {
  id: number;
  name: string;
  describe: string;
}

const ELEMENT_DATA: LogModel[] = [
  { id: 1, name: 'Hydrogen', describe: '' },
  { id: 2, name: 'Helium', describe: '' },
  { id: 3, name: 'Lithium', describe: '' },
  { id: 4, name: 'Beryllium', describe: '' },
  { id: 5, name: 'Boron', describe: '' },
  { id: 6, name: 'Carbon', describe: '' },
  {
    id: 7,
    name: 'Nitrogen',
    describe: '14.0067',
  },
  { id: 8, name: 'Oxygen', describe: '' },
  { id: 9, name: 'Fluorine', describe: '' },
  { id: 10, name: 'Neon', describe: '' },
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
  selector: 'app-collect-gateway-data-handler',
  templateUrl: './collect-gateway-data-handler.component.html',
  styleUrls: ['./collect-gateway-data-handler.component.scss'],
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
export class CollectGatewayDataHandlerComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'describe'];
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
    const dialogResult = this.dialog.open(EditHandlerComponent, {
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
    const dialogResult = this.dialog.open(EditHandlerComponent, {
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
