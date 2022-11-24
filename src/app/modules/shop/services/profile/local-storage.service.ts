import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(key: string): string {
    if (key != undefined && key != null) {
      const temp = localStorage.getItem(key);
      return temp != null ? temp : '';
    }
    return '';
  }

  setItem(key: string, value: string) {
    if (key != undefined && key != null) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string) {
    if (key != undefined && key != null) {
      localStorage.removeItem(key);
    }
  }
}
