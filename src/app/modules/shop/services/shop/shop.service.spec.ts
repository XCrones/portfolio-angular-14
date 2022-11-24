import { TestBed } from '@angular/core/testing';

import { ShopService } from './shop.service';

describe('ShopService', () => {
  let service: ShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('toggleCart() => cart = !cart and profile = true', () => {
    expect(service.toggleCart());
    expect(service.cartIsHide).toBeFalsy();
    expect(service.profileIsHide).toBeTruthy();
  });

  it('toggleProfile() => profile = !profile and cart = true', () => {
    expect(service.toggleProfile());
    expect(service.profileIsHide).toBeFalsy();
    expect(service.cartIsHide).toBeTruthy();
  });
});
