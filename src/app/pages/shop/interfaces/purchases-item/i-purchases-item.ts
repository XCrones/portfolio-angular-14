import { IPurchasesProducts } from '../purchases-products/i-purchases-products';

export interface IPurchasesItem {
  date: string;
  products: Array<IPurchasesProducts>;
}
