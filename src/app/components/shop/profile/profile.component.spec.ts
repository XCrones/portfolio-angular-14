import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { TextNeonDirective } from 'src/app/modules/ui/text-neon/text-neon.directive';
import { NeonService } from 'src/app/services/neon/neon.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { IPurchasesItem } from '../../interfaces/purchases-item/i-purchases-item';
import { ProfileService } from '../../services/profile/profile.service';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { ShopService } from '../../services/shop/shop.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let neonService: NeonService;
  let profileService: ProfileService;
  let paginatorService: PaginatorV2Service;
  let authService: AuthService;
  let purchaseService: PurchaseService;
  let shopService: ShopService;
  let shadowService: ShadowService;

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  const testPurch: IPurchasesItem = {
    date: '2022-11-11T17:28:293',
    products: [
      { count: 1, id: 1, price: 109.99 },
      { count: 2, id: 1, price: 119.99 },
    ],
  };

  const testArrPurrchases: IPurchasesItem[] = [
    testPurch,
    testPurch,
    testPurch,
    testPurch,
    testPurch,
    testPurch,
    testPurch,
    testPurch,
  ];
  const testPages: string[] = ['', ''];

  const mockProfileService = {
    get purchases(): IPurchasesItem[] {
      return testArrPurrchases;
    },
    get isLoadData(): boolean {
      return false;
    },
    profileSignOut() {},
    tryProfile(uid: string) {},
  };

  const mockPaginatorV2Service = jasmine.createSpyObj([
    'init',
    'isCurrentPage',
    'jumpPage',
    'pages',
    'parse',
  ]);

  mockPaginatorV2Service.init.and.callFake((v: number) => {});
  mockPaginatorV2Service.parse.and.returnValue(testArrPurrchases);
  mockPaginatorV2Service.pages.and.returnValue(testPages);
  mockPaginatorV2Service.isCurrentPage.and.returnValue(true);
  mockPaginatorV2Service.jumpPage.and.callFake((v: number) => {});

  const mockAuthService = {
    get isAuth(): boolean {
      return true;
    },
    get userName(): string | undefined {
      return 'test user name';
    },
    signOut() {},
  };

  const mockPurchaseService = jasmine.createSpyObj(['isHide', 'open']);
  mockPurchaseService.isHide.and.returnValue(true);
  mockPurchaseService.open.and.callFake((obj: IPurchasesItem) => {});

  const mockShadowService = jasmine.createSpyObj(['getTextNeon']);
  mockShadowService.getTextNeon.and.returnValue('#fff');

  const mockShopService = jasmine.createSpyObj(['toggleProfile']);
  mockShopService.toggleProfile.and.callFake(() => {});

  beforeEach(async () => {
    TestBed.overrideComponent(ProfileComponent, {
      set: {
        providers: [
          { provide: PaginatorV2Service, useValue: mockPaginatorV2Service },
        ],
      },
    });

    await TestBed.configureTestingModule({
      providers: [
        { provide: NeonService, useValue: mockNeonService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: PurchaseService, useValue: mockPurchaseService },
        { provide: ShopService, useValue: mockShopService },
        { provide: ShadowService, useValue: mockShadowService },
      ],
      declarations: [ProfileComponent, TextNeonDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    neonService = TestBed.inject(NeonService);
    profileService = TestBed.inject(ProfileService);
    paginatorService = TestBed.inject(PaginatorV2Service);
    authService = TestBed.inject(AuthService);
    purchaseService = TestBed.inject(PurchaseService);
    shopService = TestBed.inject(ShopService);
    shadowService = TestBed.inject(ShadowService);

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    mockShopService.toggleProfile.calls.reset();
    mockNeonService.isEnable.calls.reset();
    mockShadowService.getTextNeon.calls.reset();

    mockPurchaseService.isHide.calls.reset();
    mockPurchaseService.open.calls.reset();

    mockPaginatorV2Service.init.calls.reset();
    mockPaginatorV2Service.isCurrentPage.calls.reset();
    mockPaginatorV2Service.jumpPage.calls.reset();
    mockPaginatorV2Service.pages.calls.reset();
    mockPaginatorV2Service.parse.calls.reset();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('isCloseProfile() => search btn and click, then must be toggleProfile()', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-close'));
    btn.nativeElement.click();
    expect(mockShopService.toggleProfile).toHaveBeenCalledTimes(1);
  });

  it('signOut() => search btn and click, then must be signOut() and profileSignOut()', () => {
    const mockAuth = spyOn(authService, 'signOut').and.callFake(() => {});
    mockAuth.calls.reset();

    const mockProfile = spyOn(profileService, 'profileSignOut').and.callFake(
      () => {}
    );
    mockProfile.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-signout'));
    btn.nativeElement.click();

    expect(mockAuth).toHaveBeenCalledTimes(1);
    expect(mockProfile).toHaveBeenCalledTimes(1);
  });

  it('onResize(event) => HostListener must be call resizePaginator(width)', () => {
    const mock = spyOn(component, 'resizePaginator').and.callFake(
      (v: number) => {}
    );
    mock.calls.reset();
    const event = {
      target: {
        innerWidth: 639,
      },
    };
    component.onResize(event);
    expect(mock).toHaveBeenCalledWith(event.target.innerWidth);
  });

  it('resizePaginator(number) => if number < 640 must be call init(6) else call init(5)', () => {
    component.resizePaginator(639);
    expect(mockPaginatorV2Service.init).toHaveBeenCalledWith(6);

    component.resizePaginator(690);
    expect(mockPaginatorV2Service.init).toHaveBeenCalledWith(5);
  });

  it('openPurchase(obj) => search btn and click, then must be open(obj)', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-purchase'));
    btn.nativeElement.click();
    expect(mockPurchaseService.open).toHaveBeenCalledWith(testPurch);
  });

  it('totalPrice(obj) => must return 349,97', () => {
    const price = component.totalPrice(testPurch);
    expect(price.toFixed(2)).toBe('349.97');
  });

  it('getUser(string) => must be call tryProfile(string)', () => {
    const mock = spyOn(profileService, 'tryProfile').and.callFake(
      (v: string) => {}
    );
    mock.calls.reset();

    component.getUser('test user');
    expect(mock).toHaveBeenCalledWith('test user');
  });

  it('isCloseProfile() => must be call toggleProfile()', () => {
    component.isCloseProfile();
    expect(mockShopService.toggleProfile).toHaveBeenCalledTimes(1);
  });

  it('jumpPage(number) => search btn and click, then must be call width 0', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-page'));
    btn.nativeElement.click();
    expect(mockPaginatorV2Service.jumpPage).toHaveBeenCalledWith(0);
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
