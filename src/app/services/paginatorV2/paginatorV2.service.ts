import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginatorV2Service {
  constructor() {}

  private currPage: number = 1;
  private sumItems: number = 4;
  private readonly defaultSumItems = 4;

  init(sumItems?: number) {
    this.sumItems = !!!sumItems
      ? this.defaultSumItems
      : sumItems < 1
      ? 1
      : sumItems;
  }

  isEqualPage(page: number): boolean {
    return this.currPage === page + 1;
  }

  setCurrPage(page: number) {
    this.currPage = page + 1;
  }

  pages(arr: Array<any>): Array<any> {
    try {
      let pages = new Array(Math.ceil(arr.length / this.sumItems));
      return pages;
    } catch (e) {
      return [];
    }
  }

  parse(arr: Array<any>): Array<any> {
    try {
      let from = (this.currPage - 1) * this.sumItems;
      let to = from + this.sumItems;
      let result = arr.slice(from, to);
      return result;
    } catch (e) {
      return [];
    }
  }
}
