import { Inject, Injectable } from '@angular/core';
import {
  IProductsV2,
  IPurchasesItem,
  ProductsV2Service,
} from '../products_v2/products-v2.service';
import { Subscription } from 'rxjs';
import { FirestoreService, IUpdateCart } from '../firestore/firestore.service';
import { LocalStorageService } from './local-storage.service';
import { FIELDS_DB, IFieldsDb } from '../../fieldsDb';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

export interface IUnparsingCart {
  product: IProductsV2;
  count: number;
}

export interface IPurchasesProducts {
  id: number;
  count: number;
  price: number;
}

export interface ICartItem {
  id: number;
  count: number;
}

export interface IProfileV2 {
  cart: ICartItem[];
  purchases: IPurchasesItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _products: IProductsV2[] = [];
  private _totalPrice: number = 0;

  private _unparsingCart: IUnparsingCart[] = [];

  private _profile$!: Subscription;
  private _profile: IProfileV2 = {
    cart: [],
    purchases: [],
  };

  private _isLoadDataPurchases: boolean = false;
  private _isLoadDataCart: boolean = false;

  private _fieldsDb!: IFieldsDb;

  constructor(
    private _firestoreService: FirestoreService,
    private _productsService: ProductsV2Service,
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    @Inject(FIELDS_DB) fieldsDb: IFieldsDb
  ) {
    this._fieldsDb = fieldsDb;
    try {
      this._productsService.getAll.subscribe((sub) => {
        this._products = sub;
        this.tryProfile();
      });
    } catch (e) {
      this.tryProfile();
      console.log('try products err');
    }
  }

  get purchases(): IPurchasesItem[] {
    return this._profile.purchases;
  }
  get unparsingCart(): IUnparsingCart[] {
    return this._unparsingCart;
  }
  get isLoadDataPurchases(): boolean {
    return this._isLoadDataPurchases;
  }
  get isLoadDataCart(): boolean {
    return this._isLoadDataCart;
  }
  get totalPrice(): number {
    return this._totalPrice;
  }

  private updateFromServer(onlyCart: boolean) {
    const uid = this._authService.uid;
    if (this._authService.isAuth && uid != undefined && uid != null) {
      let updateData!: IUpdateCart | IProfileV2;
      if (onlyCart) {
        updateData = {
          cart: this._profile.cart,
        };
      } else {
        updateData = this._profile;
      }

      if (!!updateData) {
        this._firestoreService.createUpdateDB(updateData, uid);
      }
    }
  }

  private updateCarts(updateFromServer: boolean) {
    this.calcTotalPrice();

    let parsingCart: ICartItem[] = this.unparsingCart.map((item) => {
      let parsingItemCart: ICartItem = {
        id: item.product.id,
        count: item.count,
      };
      return parsingItemCart;
    });

    this._profile.cart = parsingCart;
    this._localStorageService.setItem(
      this._fieldsDb.cart,
      JSON.stringify(this._profile.cart)
    );

    if (updateFromServer && this._authService.isAuth) {
      this.updateFromServer(true);
    }
  }

  profileSignOut() {
    this._profile$.unsubscribe();
    this.clearProfile(true);
  }

  private clearProfile(deleteLocalCart: boolean) {
    this._profile.cart.length = 0;
    this._profile.purchases.length = 0;
    this._unparsingCart.length = 0;
    if (deleteLocalCart) {
      this.deleteLocalCart();
    }
  }

  private clearCarts(deleteLocalCart: boolean) {
    this._profile.cart.length = 0;
    this.unparsingCart.length = 0;
    if (deleteLocalCart) {
      this.deleteLocalCart();
    }
  }

  private deleteLocalCart() {
    this._localStorageService.removeItem(this._fieldsDb.cart);
  }

  private calcTotalPrice() {
    try {
      if (!!this.unparsingCart && this.unparsingCart.length > 0) {
        let sums = this.unparsingCart.map(
          (item) => item.product.price * item.count
        );
        let result = sums.reduce(function (sum, current) {
          return sum + current;
        }, 0);
        this._totalPrice = result;
      } else {
        this._totalPrice = 0;
      }
    } catch (e) {
      this._totalPrice = 0;
    }
  }

  addCart(item: IProductsV2) {
    try {
      let searchItem = this.unparsingCart.find((v) => v.product.id === item.id);
      if (!searchItem) {
        let tempItem: IUnparsingCart = {
          product: item,
          count: 1,
        };
        this._unparsingCart.push(tempItem);
      } else {
        searchItem.count++;
      }

      this.updateCarts(true);
    } catch (e) {
      console.log(`error add new item to cart, id: ${item.id}`);
    }
  }

  decrement(id: number) {
    try {
      let searchItem = this.unparsingCart.find(
        (value) => value.product.id === id
      );
      if (!!searchItem && searchItem.count > 1) {
        searchItem.count--;
        this.updateCarts(true);
      } else {
        this.deleteItem(id);
      }
    } catch (e) {
      console.log(`error decr item from cart, id: ${id}`);
    }
  }

  increment(id: number) {
    try {
      let searchItem = this.unparsingCart.find(
        (value) => value.product.id === id
      );
      if (!!searchItem && searchItem.count > 0) {
        searchItem.count++;
        this.updateCarts(true);
      }
    } catch (e) {
      console.log(`error increm item from cart, id: ${id}`);
    }
  }

  deleteItem(id: number) {
    try {
      let tempIdx = this.unparsingCart.findIndex(
        (value) => value.product.id === id
      );
      if (tempIdx !== -1) {
        this.unparsingCart.splice(tempIdx, 1);
        this.updateCarts(true);
      }
    } catch (e) {
      console.log(`delete cart err, no found item, id: ${id}`);
    }
  }

  isInCart(id: number): boolean {
    let search = this.unparsingCart.find((value) => value.product.id === id);
    return !!search?.product?.id ? true : false;
  }

  buy() {
    if (this.unparsingCart.length > 0) {
      let date =
        new Date().toISOString().split('T')[0] +
        'T' +
        new Date().toLocaleString().split(',')[1].trim();

      let tempItem: IPurchasesItem = {
        date: date,
        products: [],
      };

      this.unparsingCart.map((v) => {
        let parsingItem: IPurchasesProducts = {
          id: v.product.id,
          count: v.count,
          price: v.product.price,
        };
        tempItem.products.push(parsingItem);
      });
      this._profile.purchases.push(tempItem);
      this.clearCarts(true);
      this.updateFromServer(false);
    }
  }

  tryProfile(uid?: string) {
    this._isLoadDataPurchases = true;
    this._isLoadDataCart = true;
    try {
      if (!!uid) {
        this.profileFromServer(uid);
      } else {
        if (this._authService.isAuth) {
          const userId = this._authService.uid;
          if (!!userId) {
            this.profileFromServer(userId);
          }
        } else {
          this._isLoadDataPurchases = false;
          this.cartFromLocal();
        }
      }
    } catch (e) {
      this.cartFromLocal();
      console.log('error get profile from server, try local cart');
    }
  }

  private cartFromLocal() {
    this._isLoadDataCart = true;
    try {
      const searchProfile = this._localStorageService.getItem(
        this._fieldsDb.cart
      );
      if (!!searchProfile) {
        const parsingCart = JSON.parse(searchProfile);
        if (Array.isArray(parsingCart) && parsingCart.length > 0) {
          this.makeCart(parsingCart, false);
          this.updateCarts(false);
        }
      }
      this._isLoadDataCart = false;
    } catch (err) {
      this._isLoadDataCart = false;
      console.log(`local cart not found`);
    }
  }

  private async profileFromServer(uid: string) {
    try {
      this._profile$ = (await this._firestoreService.getProfile(uid)).subscribe(
        (observer) => {
          let searchCart = observer[this._fieldsDb.cart];
          let searchProfile = observer[this._fieldsDb.purchases];

          if (!!searchCart && Array.isArray(searchCart)) {
            let tempCart: ICartItem[] = searchCart;
            this.makeCart(tempCart, true);
            this._isLoadDataCart = false;
          } else {
            this._isLoadDataCart = false;
          }

          if (!!searchProfile && Array.isArray(searchProfile)) {
            let tempPurchases: IPurchasesItem[] = searchProfile;
            this._profile.purchases = tempPurchases;
            this._isLoadDataPurchases = false;
          } else {
            this._isLoadDataPurchases = false;
          }
        }
      );
    } catch (e) {
      this._isLoadDataPurchases = false;
      this._isLoadDataCart = false;
      console.log('err get profile from server');
    }
  }

  private makeCart(arr: ICartItem[], deleteFromLocal: boolean) {
    if (this._authService.isAuth) {
      this.clearProfile(deleteFromLocal);
    }
    arr.map((item) => {
      let searchItem = this._products.find((v) => v.id === item.id);
      if (!!searchItem) {
        let tempUnparsingItem: IUnparsingCart = {
          product: searchItem,
          count: item.count,
        };
        this._unparsingCart.push(tempUnparsingItem);
      }
    });
    this._isLoadDataCart = false;
  }
}
