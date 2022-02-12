import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class MatPaginatorIntlCroService {
  // constructor() {
  //   super();
  //   super.nextPageLabel = '下一页';
  //   super.previousPageLabel = '上一页';
  //   super.itemsPerPageLabel = '显示条数';
  //   super.getRangeLabel = function (
  //     page: number,
  //     pageSize: number,
  //     length: number
  //   ) {
  //     if (length === 0 || pageSize === 0) {
  //       return '0 od ' + length;
  //     }
  //     length = Math.max(length, 0);
  //     const startIndex = page * pageSize;
  //     // If the start index exceeds the list length, do not try and fix the end index to the end.
  //     const endIndex =
  //       startIndex < length
  //         ? Math.min(startIndex + pageSize, length)
  //         : startIndex + pageSize;
  //     return startIndex + 1 + ' - ' + endIndex + ' od ' + length;
  //   };
  // }
}

export function GetPaginator() {
  const paginator = new MatPaginatorIntl();

  paginator.nextPageLabel = '下一页';
  paginator.previousPageLabel = '上一页';
  paginator.itemsPerPageLabel = '显示条数';
  paginator.getRangeLabel = function (
    page: number,
    pageSize: number,
    length: number
  ) {
    if (length === 0 || pageSize === 0) {
      return `0 到 ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} 到 ${length}`;
  };

  return paginator;
}
