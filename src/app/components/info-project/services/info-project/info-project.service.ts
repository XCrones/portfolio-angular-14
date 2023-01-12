import { Injectable } from '@angular/core';

export interface IInfoProject {
  title?: string;
  subtitle?: Array<string>;
  nameProject?: string;
}

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
