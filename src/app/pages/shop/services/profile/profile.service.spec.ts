import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { IUpdateCart } from 'src/app/modules/shop/interfaces/firestore-shop/i-update-cart';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';
import { IProfileV2 } from '../../interfaces/profileV2/i-profile-v2';
import { FirestoreService } from '../firestore/firestore.service';
import { ProductsV2Service } from '../products_v2/products-v2.service';
import { LocalStorageService } from './local-storage.service';
import { ProfileService } from './profile.service';
import { fieldsDb, FIELDS_DB } from '../../fieldsDb';
import { IUpdatePurch } from '../../interfaces/firestore-shop/i-update-purch';

describe('ProfileService', () => {
  let service: ProfileService;
  let firestoreService: FirestoreService;
  let productsV2Service: ProductsV2Service;
  let localStorageService: LocalStorageService;
  let authService: AuthService;

  const mockFireStoreService = jasmine.createSpyObj([
    'getProfile',
    'createUpdateDB',
  ]);

  const mockProductsV2Service = {
    get getAll(): BehaviorSubject<IProductsV2[]> {
      return new BehaviorSubject<IProductsV2[]>([
        {
          id: 1,
          title: 'testing',
          price: 0,
          description: '',
          category: '',
          image: '',
          rating: {
            rate: 0,
            count: 0,
          },
        },
        {
          id: 2,
          title: 'testing',
          price: 0,
          description: '',
          category: '',
          image: '',
          rating: {
            rate: 0,
            count: 0,
          },
        },
      ]);
    },
  };

  const mockAuthService = {
    get isAuth(): boolean {
      return false;
    },
    get uid(): string {
      return 'test';
    },
  };

  const mockLocalStorageService = jasmine.createSpyObj([
    'getItem',
    'setItem',
    'removeItem',
  ]);

  const testProduct: IProductsV2 = {
    id: 22,
    title: '',
    price: 109.95,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  };

  const keyCart = 'cart';
  const keyPurchases = 'purchases';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        { provide: FirestoreService, useValue: mockFireStoreService },
        { provide: ProductsV2Service, useValue: mockProductsV2Service },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: FIELDS_DB, useValue: fieldsDb },
      ],
    });

    service = TestBed.inject(ProfileService);
    firestoreService = TestBed.inject(FirestoreService);
    productsV2Service = TestBed.inject(ProductsV2Service);
    localStorageService = TestBed.inject(LocalStorageService);
    authService = TestBed.inject(AuthService);
    TestBed.inject(FIELDS_DB);

    mockFireStoreService.createUpdateDB.and.callFake(
      (data: IUpdateCart | IUpdatePurch | IProfileV2, uid: string) => {}
    );

    mockFireStoreService.getProfile.and.returnValue(
      Promise.resolve(
        new BehaviorSubject<IProfileV2>({
          cart: [
            { id: 1, count: 1 },
            { id: 2, count: 1 },
          ],
          purchases: [
            {
              date: '2022-11-04T16:30:32',
              products: [
                {
                  id: 7,
                  count: 1,
                  price: 9.99,
                },
                {
                  id: 19,
                  count: 1,
                  price: 7.95,
                },
              ],
            },
          ],
        })
      )
    );

    mockLocalStorageService.getItem.and.returnValue(
      '[{"id":19,"count":1},{"id":7,"count":1}]'
    );
    mockLocalStorageService.setItem.and.callFake(
      (key: string, value: string) => {}
    );
    mockLocalStorageService.removeItem.and.callFake((key: string) => {});

    mockFireStoreService.createUpdateDB.calls.reset();
    mockFireStoreService.getProfile.calls.reset();
    mockLocalStorageService.getItem.calls.reset();
    mockLocalStorageService.setItem.calls.reset();
    mockLocalStorageService.removeItem.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('addCart(item) => must be add to unparsingCart, if item is found => item.count++', () => {
    service.addCart(testProduct);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledWith(
      keyCart,
      JSON.stringify([{ id: testProduct.id, count: 1 }])
    );

    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(1);
    expect(service.unparsingCart[0].product.id).toEqual(testProduct.id);
    expect(service.unparsingCart[0].count).toEqual(1);

    service.addCart(testProduct);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledWith(
      keyCart,
      JSON.stringify([{ id: testProduct.id, count: 2 }])
    );
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(2);
    expect(service.unparsingCart[0].product.id).toEqual(testProduct.id);
    expect(service.unparsingCart[0].count).toEqual(2);
  });

  it('increment(id) => must be search item and increment', () => {
    service.addCart(testProduct);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(1);
    service.increment(testProduct.id);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(2);
    expect(service.unparsingCart[0].count).toEqual(2);
  });

  it('decrement(id) => must be search item and decrement. if count = 1 => deleteItem(id)', () => {
    service.addCart(testProduct);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(1);
    service.addCart(testProduct);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(2);
    service.decrement(testProduct.id);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(3);
    expect(service.unparsingCart[0].count).toEqual(1);

    service.decrement(testProduct.id);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(4);
    expect(service.unparsingCart.length).toEqual(0);
  });

  it('deleteItem(id) => must be search item and delete', () => {
    service.addCart(testProduct);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(1);
    service.deleteItem(testProduct.id);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(2);
    expect(service.unparsingCart.length).toEqual(0);
  });

  it('isInCart(id) => must be search item and return boolean', () => {
    service.addCart(testProduct);
    expect(service.isInCart(testProduct.id)).toBeTruthy();
    expect(service.isInCart(11)).toBeFalsy();
  });

  it('buy() => must be converting to purchases and clear carts', () => {
    service.addCart(testProduct);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledTimes(1);
    service.buy();
    expect(mockLocalStorageService.removeItem).toHaveBeenCalledTimes(1);
    const purchases = service.purchases;
    expect(purchases[0].products[0].id).toBe(testProduct.id);
    expect(purchases[0].products[0].count).toBe(1);
    expect(service.unparsingCart.length).toBe(0);
  });

  it('totalPrice() => must be calc total price cart', () => {
    service.addCart(testProduct);
    expect(service.totalPrice).toBe(109.95);
  });

  it('tryProfile() => isAuth = false => must be call cartFromLocal()', () => {
    spyOnProperty(authService, 'isAuth', 'get').and.returnValue(false);

    expect(service.isLoadDataPurchases).toBeFalsy();
    expect(service.isLoadDataCart).toBeFalsy();
    service.tryProfile();
    expect(service.isLoadDataPurchases).toBeFalsy();
    expect(service.isLoadDataCart).toBeFalsy();

    expect(mockFireStoreService.getProfile).not.toHaveBeenCalled();
  });

  it('tryProfile() => isAuth = true => must be call cartFromLocal()', () => {
    spyOnProperty(authService, 'isAuth', 'get').and.returnValue(true);

    expect(service.isLoadDataPurchases).toBeFalsy();
    expect(service.isLoadDataCart).toBeFalsy();
    service.tryProfile();
  });
});
