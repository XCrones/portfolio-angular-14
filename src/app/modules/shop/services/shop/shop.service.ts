import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor() {}

  private _cartIsHide: boolean = true;
  private _profileIsHide: boolean = true;

  get cartIsHide(): boolean {
    return this._cartIsHide;
  }
  private set cartIsHide(value: boolean) {
    this._cartIsHide = value;
  }
  get profileIsHide(): boolean {
    return this._profileIsHide;
  }
  private set profileIsHide(value: boolean) {
    this._profileIsHide = value;
  }

  toggleCart() {
    this.profileIsHide = !this.profileIsHide ? true : this.profileIsHide;
    this.cartIsHide = !this.cartIsHide;
  }

  toggleProfile() {
    this.cartIsHide = !this.cartIsHide ? true : this.cartIsHide;
    this.profileIsHide = !this.profileIsHide;
  }
}
