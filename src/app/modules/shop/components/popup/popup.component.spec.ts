import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TextNeonDirective } from 'src/app/modules/ui/text-neon/text-neon.directive';
import { NeonService } from 'src/app/services/neon/neon.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';
import { PopupService } from '../../services/popup/popup.service';
import { ProfileService } from '../../services/profile/profile.service';

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let popupService: PopupService;

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

  const testPrice = String(testProduct1.price);

  const mockPopupService = {
    close() {},
    get product(): IProductsV2 {
      return testProduct1;
    },
  };
  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  const mockPrifleService = jasmine.createSpyObj(['addCart', 'isInCart']);
  const mockShadowService = jasmine.createSpyObj(['getTextNeon']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: PopupService, useValue: mockPopupService },
        { provide: ProfileService, useValue: mockPrifleService },
        { provide: NeonService, useValue: mockNeonService },
        { provide: ShadowService, useValue: mockShadowService },
      ],
      declarations: [PopupComponent, TextNeonDirective],
    }).compileComponents();

    popupService = TestBed.inject(PopupService);
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;

    mockPrifleService.isInCart.and.returnValue(false);
    mockNeonService.isEnable.and.returnValue(true);
    mockShadowService.getTextNeon.and.returnValue('#fff');

    mockNeonService.isEnable.calls.reset();
    mockPrifleService.addCart.calls.reset();
    mockPrifleService.isInCart.calls.reset();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addCart(item) => search btn and click, then must be called with(item)', () => {
    const btns = fixture.debugElement.query(By.css('button.btn-buy'));
    btns.nativeElement.click();
    expect(mockPrifleService.addCart).toHaveBeenCalledWith(testProduct1);
    expect(mockPrifleService.addCart).toHaveBeenCalledTimes(1);
  });

  it('close() => search btn and click, then must be called close()', () => {
    const mockClose = spyOn(popupService, 'close').and.callFake(() => {});
    mockClose.calls.reset();
    const btns = fixture.debugElement.query(By.css('button.btn-close'));
    btns.nativeElement.click();
    expect(mockClose).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('price => must be (USD ${testPrice})', () => {
    const div = fixture.debugElement.query(By.css('div.price')).nativeElement
      .innerHTML;
    expect(String(div).trim()).toEqual(`USD ${testPrice}`);
  });
});
