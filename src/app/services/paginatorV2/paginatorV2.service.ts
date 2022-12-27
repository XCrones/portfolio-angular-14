import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginatorV2Service {
  constructor() {}

  private currentPage: number = 1;
  private sumItemsOnPage: number = 4;
  private readonly defaultSumItems = 4;

  init(sumItems?: number) {
    this.sumItemsOnPage = !!!sumItems
      ? this.defaultSumItems
      : sumItems < 1
      ? 1
      : sumItems;
  }

  isCurrentPage = (page: number): boolean => page + 1 === this.currentPage;

  jumpPage(page: number) {
    this.currentPage = page + 1;
  }

  pages(arr: Array<any>): Array<any> {
    try {
      return Array(Math.ceil(arr.length / this.sumItemsOnPage)).fill('');
    } catch (e) {
      return [];
    }
  }

  parse(arr: Array<any>): Array<any> {
    try {
      let from = (this.currentPage - 1) * this.sumItemsOnPage;
      let to = from + this.sumItemsOnPage;
      let result = arr.slice(from, to);
      return result;
    } catch (e) {
      return [];
    }
  }
}
