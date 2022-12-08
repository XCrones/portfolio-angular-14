import { Injectable } from '@angular/core';
import { INavItem } from 'src/app/interfaces/nav-item/i-nav-item';

export interface IProjects {
  title: string;
  link: string | undefined;
}

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

  private _projects: IProjects[] = [
    {
      title: 'angular',
      link: 'https://any-dea-angular.web.app',
    },
    {
      title: 'react',
      link: undefined, //'https://any-dea-react.web.app'
    },
    {
      title: 'vue',
      link: 'https://anydea-vue.web.app/',
    },
  ];

  isHide(state?: boolean | undefined): boolean {
    return (this._isHide = state != undefined ? state : this._isHide);
  }

  get itemsNav(): Array<INavItem> {
    return this._itemsNav;
  }

  get projects(): IProjects[] {
    return this._projects;
  }
}
