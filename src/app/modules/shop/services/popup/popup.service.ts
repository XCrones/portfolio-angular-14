import { Injectable } from '@angular/core';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor() {}

  private _product: IProductsV2 = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  };

  private _isHide: boolean = true;

  get isHide(): boolean {
    return this._isHide;
  }
  get product(): IProductsV2 {
    return this._product;
  }

  show(product: IProductsV2) {
    this._product = product;
    this._isHide = false;
  }

  close() {
    this._isHide = true;
  }
}
