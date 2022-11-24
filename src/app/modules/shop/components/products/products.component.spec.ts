import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { NeonService } from 'src/app/services/neon/neon.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { PopupService } from '../../services/popup/popup.service';
import { ProductsV2Service } from '../../services/products_v2/products-v2.service';
import { ProfileService } from '../../services/profile/profile.service';
import { ShopService } from '../../services/shop/shop.service';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsV2Service: ProductsV2Service;
  let paginatorV2Service: PaginatorV2Service;

  const mockPopupService = jasmine.createSpyObj(['show']);
  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  const mockPrifleService = jasmine.createSpyObj(['addCart', 'isInCart']);
  const mockShopService = jasmine.createSpyObj(['toggleCart']);
  const mockPaginatorV2Service = jasmine.createSpyObj([
    'init',
    'isEqualPage',
    'setCurrPage',
    'pages',
    'parse',
  ]);

  mockNeonService.isEnable.and.returnValue(true);

  mockPrifleService.addCart.and.callFake((item: IProductsV2) => {});
  mockPopupService.show.and.callFake((item: IProductsV2) => {});

  mockPaginatorV2Service.init.and.callFake((sumItems?: number) => {});
  mockPaginatorV2Service.isEqualPage.and.callFake((page: number): boolean => {
    return false;
  });
  mockPaginatorV2Service.setCurrPage.and.callFake((page: number) => {});
  mockPaginatorV2Service.pages.and.callFake((arr: Array<any>): Array<any> => {
    return [];
  });
  mockPaginatorV2Service.parse.and.callFake((arr: Array<any>): Array<any> => {
    return [];
  });

  const testProduct1 = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  };

  const testProduct2 = {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: { rate: 4.1, count: 259 },
  };

  const mockProductsV2Service = {
    get getAll(): BehaviorSubject<IProductsV2[]> {
      return new BehaviorSubject<IProductsV2[]>([testProduct1, testProduct2]);
    },
    isHidePopup(item: IProductsV2) {},
    get search(): string {
      return '';
    },
    get currFilter(): string {
      return '';
    },
    get stateCurrFilter(): boolean {
      return false;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: NeonService, useValue: mockNeonService },
        { provide: PopupService, useValue: mockPopupService },
        { provide: PaginatorV2Service, useValue: mockPaginatorV2Service },
        { provide: ProductsV2Service, useValue: mockProductsV2Service },
        { provide: ProfileService, useValue: mockPrifleService },
        { provide: ShopService, useValue: mockShopService },
      ],
      declarations: [ProductsComponent, FilterPipe],
    }).compileComponents();

    productsV2Service = TestBed.inject(ProductsV2Service);
    paginatorV2Service = TestBed.inject(PaginatorV2Service);

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    mockPrifleService.isInCart.and.returnValue(false);

    mockNeonService.isEnable.calls.reset();
    mockPrifleService.addCart.calls.reset();
    mockPrifleService.isInCart.calls.reset();
    mockShopService.toggleCart.calls.reset();
    mockPaginatorV2Service.init.calls.reset();
    mockPaginatorV2Service.isEqualPage.calls.reset();
    mockPaginatorV2Service.setCurrPage.calls.reset();
    mockPaginatorV2Service.setCurrPage.calls.reset();
    mockPaginatorV2Service.parse.calls.reset();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addCart(item) => search btn and click, then must be called with(item)', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-buy'));
    btn.nativeElement.click();
    expect(mockPrifleService.addCart).toHaveBeenCalledWith(testProduct1);
    expect(mockPrifleService.addCart).toHaveBeenCalledTimes(1);
  });

  it('toggleCart() => search btn and click, then must be called toggleCart', () => {
    mockPrifleService.isInCart.and.returnValue(true);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button.btn-cart'));
    btn.nativeElement.click();
    expect(mockShopService.toggleCart).toHaveBeenCalledTimes(1);
  });

  it('show(item) => search btn and click, then must be called show(item)', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-about'));
    btn.nativeElement.click();
    expect(mockPopupService.show).toHaveBeenCalledWith(testProduct1);
    expect(mockPopupService.show).toHaveBeenCalledTimes(1);
  });

  it('neon() => must be true', () => {
    expect(component.neon).toBeTruthy();
  });
});
