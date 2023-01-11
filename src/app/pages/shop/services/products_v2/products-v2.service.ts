import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../apiUrl';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';

const filters = ['цене', 'рейтингу', 'остатку'];

@Injectable({
  providedIn: 'root',
})
export class ProductsV2Service {
  private _currFilter: string = filters[0];
  private _stateCurrFilter: boolean = true;
  private _isHideFilters: boolean = true;
  private _search: string = '';
  private _apiBaseURL!: string;

  constructor(
    private httpCilent: HttpClient,
    @Inject(API_BASE_URL) apiBaseURL: string
  ) {
    this._apiBaseURL = apiBaseURL;
  }

  get getAll(): Observable<IProductsV2[]> {
    return this.httpCilent.get<IProductsV2[]>(`${this._apiBaseURL}/products`);
  }
  get filters(): Array<string> {
    return filters;
  }
  get currFilter(): string {
    return this._currFilter;
  }
  set currFilter(filter: string) {
    this._currFilter = filter;
  }
  get isHideFilters(): boolean {
    return this._isHideFilters;
  }
  set isHideFilters(state: boolean) {
    this._isHideFilters = state;
  }
  get stateCurrFilter(): boolean {
    return this._stateCurrFilter;
  }
  set stateCurrFilter(state: boolean) {
    this._stateCurrFilter = state;
  }
  get search(): string {
    return this._search;
  }
  set search(value: string) {
    this._search = value;
  }
}
