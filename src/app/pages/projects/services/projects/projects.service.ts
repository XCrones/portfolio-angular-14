import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor() {}

  private _isHide: boolean = false;

  isHide(state?: boolean | undefined): boolean {
    return (this._isHide = state != undefined ? state : this._isHide);
  }
}
