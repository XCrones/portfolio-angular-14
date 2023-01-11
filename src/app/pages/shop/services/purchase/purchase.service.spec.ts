import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';
import { IPurchasesItem } from '../../interfaces/purchases-item/i-purchases-item';
import { ProductsV2Service } from '../products_v2/products-v2.service';
import { PurchaseService } from './purchase.service';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let productsV2Service: ProductsV2Service;

  const fakeProducts = {
    get getAll(): BehaviorSubject<IProductsV2[]> {
      return new BehaviorSubject<IProductsV2[]>([
        {
          id: 1,
          title: '',
          price: 0,
          description: '',
          category: '',
          image: 'testing',
          rating: {
            rate: 0,
            count: 0,
          },
        },
      ]);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PurchaseService,
        {
          provide: ProductsV2Service,
          useValue: fakeProducts,
        },
      ],
    });
    service = TestBed.inject(PurchaseService);
    productsV2Service = TestBed.inject(ProductsV2Service);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('isHideCreate() => should be default is true, isHideCreate(true|false) return true|false', () => {
    expect(service.isHide()).toBeTruthy();
    expect(service.isHide(true)).toBeTruthy();
    expect(service.isHide(false)).toBeFalsy();
  });

  it('close() => should be clear tempItem(length = 0) isHide() must be true', () => {
    service.close();
    service.purchase.subscribe((observer) => {
      expect(observer).toEqual({
        date: '',
        price: 0,
        items: [],
      });
      expect(service.isHide()).toBeTruthy();
    });
  });

  it('open(item) => copy item to temp item then isHide() = false', () => {
    const mockItem: IPurchasesItem = {
      date: '2022-08-11',
      products: [{ id: 1, count: 2, price: 10 }],
    };

    service.open(mockItem);
    service.purchase.subscribe((observer) => {
      expect(observer.date).toEqual(mockItem.date);
      expect(observer.price).toEqual(
        mockItem.products[0].count * mockItem.products[0].price
      );
      expect(observer.items[0].image).toEqual('testing');
      expect(service.isHide(false)).toBeFalsy();
    });
  });
});
