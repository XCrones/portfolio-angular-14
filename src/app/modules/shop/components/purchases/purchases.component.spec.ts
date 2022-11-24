import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { ISelectPurchaseItem } from '../../interfaces/select-purchase-item/i-select-purchase-item';
import { ISelectPurchase } from '../../interfaces/select-purchase/i-select-purchase';
import { PurchaseService } from '../../services/purchase/purchase.service';

import { PurchasesComponent } from './purchases.component';

describe('PurchasesComponent', () => {
  let component: PurchasesComponent;
  let fixture: ComponentFixture<PurchasesComponent>;

  let paginatorV2Service: PaginatorV2Service;
  let purchaseService: PurchaseService;

  const testPages: string[] = ['', ''];

  const testItem: ISelectPurchaseItem = {
    count: 1,
    image: '',
    price: 10,
    title: 'test',
  };

  const testPurchItems: ISelectPurchaseItem[] = [
    testItem,
    testItem,
    testItem,
    testItem,
    testItem,
    testItem,
    testItem,
    testItem,
    testItem,
    testItem,
  ];

  const testPurchase: ISelectPurchase = {
    date: '2022-12-11T13:14:123',
    price: 100,
    items: testPurchItems,
  };

  const mockPaginatorV2Service = jasmine.createSpyObj([
    'init',
    'isEqualPage',
    'setCurrPage',
    'pages',
    'parse',
  ]);

  mockPaginatorV2Service.init.and.callFake((v: number) => {});
  mockPaginatorV2Service.parse.and.returnValue(testPurchItems);
  mockPaginatorV2Service.pages.and.returnValue(testPages);
  mockPaginatorV2Service.isEqualPage.and.returnValue(true);
  mockPaginatorV2Service.setCurrPage.and.callFake((v: number) => {});

  const mockPurchaseService = {
    close() {},
    get purchase(): Subject<ISelectPurchase> {
      return new BehaviorSubject<ISelectPurchase>(testPurchase);
    },
  };

  beforeEach(async () => {
    TestBed.overrideComponent(PurchasesComponent, {
      set: {
        providers: [
          { provide: PaginatorV2Service, useValue: mockPaginatorV2Service },
        ],
      },
    });
    await TestBed.configureTestingModule({
      providers: [{ provide: PurchaseService, useValue: mockPurchaseService }],
      declarations: [PurchasesComponent],
    }).compileComponents();

    paginatorV2Service = TestBed.inject(PaginatorV2Service);
    purchaseService = TestBed.inject(PurchaseService);

    fixture = TestBed.createComponent(PurchasesComponent);
    component = fixture.componentInstance;

    mockPaginatorV2Service.init.calls.reset();
    mockPaginatorV2Service.isEqualPage.calls.reset();
    mockPaginatorV2Service.setCurrPage.calls.reset();
    mockPaginatorV2Service.pages.calls.reset();
    mockPaginatorV2Service.parse.calls.reset();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isCloseProfile() => search btn and click, then must be toggleProfile()', () => {
    const mock = spyOn(purchaseService, 'close').and.callFake(() => {});
    mock.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-back'));
    btn.nativeElement.click();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('setCurrPage(number) => search btn and click, then must be call width 0', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-page'));
    btn.nativeElement.click();
    expect(mockPaginatorV2Service.setCurrPage).toHaveBeenCalledWith(0);
  });

  it('link-active must be contain in classList btn if isEqualPage true, else not contain', () => {
    mockPaginatorV2Service.isEqualPage.and.returnValue(false);
    fixture.detectChanges();

    let btn = fixture.debugElement.query(By.css('button.btn-page'));
    expect(btn.nativeElement.classList).not.toContain('link-active');

    mockPaginatorV2Service.isEqualPage.and.returnValue(true);
    fixture.detectChanges();

    btn = fixture.debugElement.query(By.css('button.btn-page'));
    expect(btn.nativeElement.classList).toContain('link-active');
  });

  it('onResize(event) => HostListener must be set titleLength if width < 640 -> 20, else 30', () => {
    let event = {
      target: {
        innerWidth: 639,
      },
    };
    component.onResize(event);
    expect(component.titleLength).toBe(20);

    event = {
      target: {
        innerWidth: 899,
      },
    };
    component.onResize(event);
    expect(component.titleLength).toBe(30);
  });
});
