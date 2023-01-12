import { Component, OnDestroy, OnInit } from '@angular/core';
import { NeonService } from 'src/app/services/neon/neon.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/pages/shop/services/popup/popup.service';
import {
  IProductsV2,
  ProductsV2Service,
} from 'src/app/pages/shop/services/products_v2/products-v2.service';
import { ProfileService } from 'src/app/pages/shop/services/profile/profile.service';
import { ShopService } from 'src/app/pages/shop/services/shop/shop.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [PaginatorV2Service],
  animations: [
    trigger('show', [
      state(
        '*',
        style({
          scale: '0',
        })
      ),
      state(
        'item',
        style({
          scale: '1',
        })
      ),
      transition('* => item', [animate('200ms')]),
    ]),
  ],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _productsV2: IProductsV2[] = [];
  private _productsV2$!: Subscription;
  readonly pathload: string = '../../../../assets/img/load.svg';

  constructor(
    private _neonService: NeonService,
    private _popupService: PopupService,
    private _paginatorService: PaginatorV2Service,
    private _productsV2Service: ProductsV2Service,
    private _profileService: ProfileService,
    private _shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.paginator.init(8);
    this._productsV2$ = this._productsV2Service.getAll.subscribe((products) => {
      this._productsV2 = products;
    });
  }

  ngOnDestroy(): void {
    this._productsV2$.unsubscribe();
  }

  get paginator(): any {
    return this._paginatorService;
  }
  get neon(): any {
    return this._neonService.isEnable();
  }
  get productsV2(): IProductsV2[] {
    return this.sorting(this._productsV2);
  }
  get search(): string {
    return this._productsV2Service.search;
  }
  get isSearch(): boolean {
    return this.search.length < 1 ? false : true;
  }

  parseProducts(): IProductsV2[] {
    if (!this.isSearch) {
      return this.paginator.parse(this.productsV2);
    } else {
      return this._productsV2;
    }
  }

  addCart(item: IProductsV2) {
    this._profileService.addCart(item);
  }

  isHidePopup(item: IProductsV2) {
    this._popupService.show(item);
  }

  isInCart(id: number): boolean {
    return this._profileService.isInCart(id);
  }

  calcRate(rate: number): number {
    return (rate * 100) / 5;
  }

  sorting(arr: IProductsV2[]): IProductsV2[] {
    let filter = this._productsV2Service.currFilter;
    let stateFilter = this._productsV2Service.stateCurrFilter;
    switch (filter) {
      case 'цене':
        return arr.sort((a, b) =>
          stateFilter ? a.price - b.price : b.price - a.price
        );
      case 'рейтингу':
        return arr.sort((a, b) =>
          stateFilter
            ? a.rating.rate - b.rating.rate
            : b.rating.rate - a.rating.rate
        );
      case 'остатку':
        return arr.sort((a, b) =>
          stateFilter
            ? a.rating.count - b.rating.count
            : b.rating.count - a.rating.count
        );
      default:
        return arr;
    }
  }

  showCart() {
    this._shopService.toggleCart();
  }
}
