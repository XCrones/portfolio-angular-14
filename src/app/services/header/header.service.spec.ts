import { TestBed } from '@angular/core/testing';
import { INavItem } from 'src/app/interfaces/nav-item/i-nav-item';

import { HeaderService } from './header.service';

describe('HeaderService', () => {
  let service: HeaderService;

  const testItemsNav: Array<INavItem> = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isHide() => should be default is false, isHide(true|false) return true|false', () => {
    expect(service.isHide()).toBeFalsy();
    expect(service.isHide(true)).toBeTruthy();
    expect(service.isHide(false)).toBeFalsy();
  });

  it('itemsNav => must be return pattern testItemsNav', () => {
    expect(service.itemsNav).toEqual(testItemsNav);
  });
});
