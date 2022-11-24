import { InjectionToken } from '@angular/core';

export interface IFieldsDb {
  cart: 'cart';
  purchases: 'purchases';
}

export const fieldsDb: IFieldsDb = {
  cart: 'cart',
  purchases: 'purchases',
};

export const FIELDS_DB = new InjectionToken<string>('fieldsDb');
