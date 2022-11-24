import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InfoProjectService {
  constructor() {}

  private _isHide: boolean = true;

  isHide(state?: boolean | undefined): boolean {
    return (this._isHide = state != undefined ? state : this._isHide);
  }
}
