import { ICartItem } from '../cart-item/i-cart-item';
import { IPurchasesItem } from '../purchases-item/i-purchases-item';

export interface IProfileV2 {
  cart: Array<ICartItem>;
  purchases: Array<IPurchasesItem>;
}
