import { TestBed } from '@angular/core/testing';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';

import { PopupService } from './popup.service';

describe('PopupService', () => {
  let service: PopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isHide() => should be default is true', () => {
    expect(service.isHide).toBeTruthy();
  });

  it(`show(item) close() => isHide() must be true -> copy item -> isHide() must be false -> get product id must equal item id 
  then delete item -> isHide() must be true
  `, () => {
    const item: IProductsV2 = {
      id: 22,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: {
        rate: 0,
        count: 0,
      },
    };
    expect(service.isHide).toBeTruthy();
    service.show(item);
    expect(service.isHide).toBeFalsy();
    expect(service.product.id).toBe(item.id);
    expect(service.isHide).toBeFalsy();
    service.close();
    expect(service.isHide).toBeTruthy();
  });
});
