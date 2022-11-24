import { ISelectPurchaseItem } from '../select-purchase-item/i-select-purchase-item';

export interface ISelectPurchase {
  date: string;
  price: number;
  items: ISelectPurchaseItem[];
}
