import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NeonService {
  constructor() {}

  private _isEnable: boolean = true;
  isEnable(state?: boolean): boolean {
    return (this._isEnable = state != undefined ? state : this._isEnable);
  }
}
