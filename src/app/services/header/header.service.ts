import { Injectable } from '@angular/core';
import { INavItem } from 'src/app/interfaces/nav-item/i-nav-item';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor() {}

  private _isHide: boolean = false;
  private readonly _itemsNav: Array<INavItem> = [
    {
      link: '',
      title: 'главная',
    },
    {
      link: 'projects',
      title: 'проекты',
    },
    {
      link: 'contacts',
      title: 'контакты',
    },
  ];

  isHide(state?: boolean | undefined): boolean {
    return (this._isHide = state != undefined ? state : this._isHide);
  }

  get itemsNav(): Array<INavItem> {
    return this._itemsNav;
  }
}
