import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';
import { IPurchasesItem } from '../../interfaces/purchases-item/i-purchases-item';
import { ISelectPurchase } from '../../interfaces/select-purchase/i-select-purchase';
import { ProductsV2Service } from '../products_v2/products-v2.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private _products!: IProductsV2[];
  private _purchase$: BehaviorSubject<ISelectPurchase> =
    new BehaviorSubject<ISelectPurchase>({ date: '', price: 0, items: [] });

  constructor(private _productsService: ProductsV2Service) {
    this._productsService.getAll.subscribe((observer) => {
      this._products = observer;
    });
  }

  private _isHide: boolean = true;
  isHide(state?: boolean | undefined): boolean {
    return (this._isHide = state != undefined ? state : this._isHide);
  }

  get purchase(): Subject<ISelectPurchase> {
    return this._purchase$;
  }

  open(purchase: IPurchasesItem) {
    let makingPurchase: ISelectPurchase = {
      date: '',
      price: 0,
      items: [],
    };
    purchase.products.map((v) => {
      let tempItem = this._products.find((item) => v.id === item.id);
      if (!!tempItem) {
        makingPurchase.date = purchase.date;
        makingPurchase.price += v.count * v.price;
        makingPurchase.items.push({
          count: v.count,
          price: v.price,
          title: tempItem.title,
          image: tempItem.image,
        });
      }
    });
    this._purchase$.next(makingPurchase);
    this.isHide(false);
  }

  close() {
    this._purchase$.next({
      date: '',
      price: 0,
      items: [],
    });
    this.isHide(true);
  }
}
