import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { TextNeonDirective } from 'src/app/modules/ui/text-neon/text-neon.directive';
import { NeonService } from 'src/app/services/neon/neon.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';
import { IUnparsingCart } from '../../interfaces/unparsing-cart/i-unparsing-cart';
import { ProfileService } from '../../services/profile/profile.service';
import { ShopService } from '../../services/shop/shop.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let profileService: ProfileService;
  let neonService: NeonService;
  let paginatorService: PaginatorV2Service;
  let authService: AuthService;
  let shopService: ShopService;
  let shadowService: ShadowService;

  const testCartItem1: IProductsV2 = {
    id: 1,
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

  const testCartItem2: IProductsV2 = {
    id: 2,
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

  const testArr = [
    { count: 2, product: testCartItem1 },
    { count: 2, product: testCartItem2 },
  ];

  const mockProfileService = {
    get unparsingCart(): Array<IUnparsingCart> {
      return testArr;
    },
    get totalPrice(): number {
      return 10000;
    },
    get isLoadData(): boolean {
      return false;
    },
    buy() {},
    decrement(id: number) {},
    increment(id: number) {},
    deleteItem(id: number) {},
  };

  const mockAuthService = {
    get isAuth(): boolean {
      return true;
    },
  };

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  const mockShopService = jasmine.createSpyObj(['toggleCart']);
  mockShopService.toggleCart.and.returnValue(true);

  const mockShadowService = jasmine.createSpyObj(['ShadowService']);
  mockShadowService.ShadowService.and.returnValue('#fff');

  const testPages: string[] = ['', ''];

  const mockPaginatorV2Service = jasmine.createSpyObj([
    'init',
    'isCurrentPage',
    'jumpPage',
    'pages',
    'parse',
  ]);

  mockPaginatorV2Service.init.and.callFake((v: number) => {});
  mockPaginatorV2Service.parse.and.returnValue(testArr);
  mockPaginatorV2Service.pages.and.returnValue(testPages);
  mockPaginatorV2Service.isCurrentPage.and.returnValue(true);
  mockPaginatorV2Service.jumpPage.and.callFake((v: number) => {});

  beforeEach(async () => {
    TestBed.overrideComponent(CartComponent, {
      set: {
        providers: [
          { provide: PaginatorV2Service, useValue: mockPaginatorV2Service },
        ],
      },
    });
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: ProfileService, useValue: mockProfileService },
        { provide: NeonService, useValue: mockNeonService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ShopService, useValue: mockShopService },
        { provide: ShadowService, useValue: mockShadowService },
      ],
      declarations: [CartComponent, TextNeonDirective],
    }).compileComponents();

    profileService = TestBed.inject(ProfileService);
    neonService = TestBed.inject(NeonService);
    paginatorService = TestBed.inject(PaginatorV2Service);
    authService = TestBed.inject(AuthService);
    shopService = TestBed.inject(ShopService);
    shadowService = TestBed.inject(ShadowService);

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

    mockShadowService.ShadowService.calls.reset();
    mockShopService.toggleCart.calls.reset();
    mockNeonService.isEnable.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('buy() => search btns[0] and click, then must be call buy() and emit showProfile', () => {
    const mock = spyOn(profileService, 'buy').and.callFake(() => {});
    mock.calls.reset();

    const event = spyOn(component.showProfile, 'emit');
    event.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-buy'));
    btn.nativeElement.click();

    expect(mock).toHaveBeenCalled();
    expect(event).toHaveBeenCalledTimes(1);
  });

  it('buy() => search btns[0] and click, then must be emit errAuth and dont emit other', () => {
    const mockIsAuth = spyOnProperty(
      authService,
      'isAuth',
      'get'
    ).and.returnValue(false);
    mockIsAuth.calls.reset();

    const mockBuy = spyOn(profileService, 'buy').and.callFake(() => {});
    mockBuy.calls.reset();

    const eventErrAuth = spyOn(component.errAuth, 'emit');
    eventErrAuth.calls.reset();

    const eventShowProfile = spyOn(component.showProfile, 'emit');
    eventShowProfile.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-buy'));
    btn.nativeElement.click();

    expect(mockBuy).not.toHaveBeenCalled();
    expect(eventShowProfile).not.toHaveBeenCalled();

    expect(eventErrAuth).toHaveBeenCalledTimes(1);
  });

  it('increment(id) => search btns[0] and click, then must be call increment(id)', () => {
    const mock = spyOn(profileService, 'increment').and.callFake(
      (value: number) => {}
    );
    mock.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-incr'));
    btn.nativeElement.click();

    expect(mock).toHaveBeenCalledWith(1);
  });

  it('decrement(id) => search btns[0] and click, then must be call decrement(id)', () => {
    const mock = spyOn(profileService, 'decrement').and.callFake(
      (value: number) => {}
    );
    mock.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-decr'));
    btn.nativeElement.click();

    expect(mock).toHaveBeenCalledWith(1);
  });

  it('deleteItem(id) => search btns[0] and click, then must be call deleteItem(id)', () => {
    const mock = spyOn(profileService, 'deleteItem').and.callFake(
      (value: number) => {}
    );
    mock.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-delete'));
    btn.nativeElement.click();

    expect(mock).toHaveBeenCalledWith(1);
  });

  it('closeCart() => search btns[0] and click, then must be call toggleCart()', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-close'));
    btn.nativeElement.click();
    expect(mockShopService.toggleCart).toHaveBeenCalledTimes(1);
  });

  it('jumpPage(number) => search btn and click, then must be call width 0', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-page'));
    btn.nativeElement.click();
    expect(mockPaginatorV2Service.jumpPage).toHaveBeenCalledWith(0);
  });

  it('link-active must be contain in classList btn', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-page'));
    expect(btn.nativeElement.classList).toContain('link-active');
  });

  it('link-active must be contain in classList btn if isCurrentPage true, else not contain', () => {
    mockPaginatorV2Service.isCurrentPage.and.returnValue(false);
    fixture.detectChanges();
    let btn = fixture.debugElement.query(By.css('button.btn-page'));
    expect(btn.nativeElement.classList).not.toContain('link-active');

    mockPaginatorV2Service.isCurrentPage.and.returnValue(true);
    fixture.detectChanges();
    btn = fixture.debugElement.query(By.css('button.btn-page'));
    expect(btn.nativeElement.classList).toContain('link-active');
  });
});
