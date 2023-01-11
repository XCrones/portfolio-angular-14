import { Injectable } from '@angular/core';
import { ICategories } from '../../interfaces/categories/i-categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor() {}

  private readonly defaultCategori: string = 'none';
  private categories: Array<string> = [];

  private makeUniqCategories(arr: Array<string>): Array<string> {
    const tempArr = [...this.categories, ...arr, this.defaultCategori];
    const uniqSet = new Set(tempArr);
    return this.sortCategories([...uniqSet]);
  }

  private sortCategories(arr: Array<string>): Array<string> {
    arr.sort(function (a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    });
    return [...arr];
  }

  private moveUpCurrCategori(
    arr: Array<string>,
    currCategori: string
  ): Array<string> {
    if (currCategori != null || currCategori != undefined) {
      currCategori =
        currCategori.length < 1 ? this.defaultCategori : currCategori;
      if (arr.includes(currCategori)) {
        let fromIndex = arr.indexOf(currCategori);
        arr.splice(fromIndex, 1);
      }
      arr.unshift(currCategori);
    }
    return arr;
  }

  updateCategories(data: ICategories): Array<string> {
    const uniqCategories = this.makeUniqCategories(data.items);
    this.categories = this.moveUpCurrCategori(
      uniqCategories,
      data.currCategori
    );
    if (this.categories.length > 24) {
      this.categories.length = 24;
    }
    return this.categories;
  }
}
