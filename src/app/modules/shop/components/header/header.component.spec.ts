import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';
import { ShopService } from '../../services/shop/shop.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let profileService: ProfileService;
  let authService: AuthService;
  let shopService: ShopService;

  const mockAuthService = {
    get isAuth(): boolean {
      return false;
    },
  };

  const mockShopService = {
    get cartIsHide(): boolean {
      return false;
    },
    get profileIsHide(): boolean {
      return false;
    },
    toggleCart() {},
    toggleProfile() {},
  };

  const mockProfileService = {
    get unparsingCart(): number {
      return 10;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: ProfileService, useValue: mockProfileService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ShopService, useValue: mockShopService },
      ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    profileService = TestBed.inject(ProfileService);
    authService = TestBed.inject(AuthService);
    shopService = TestBed.inject(ShopService);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isOpenhamburger => search btns[0] and click, then must be isOpenhamburger is false', () => {
    const btns = fixture.debugElement.query(By.css('button.btn-hamburger'));
    btns.nativeElement.click();
    expect(component.isOpenhamburger).toBeFalsy();
  });

  it('toggleCart() => search btns[0] and click, then must be call', () => {
    const mock = spyOn(shopService, 'toggleCart').and.callFake(() => {});
    mock.calls.reset();
    const btns = fixture.debugElement.query(By.css('button.btn-cart'));
    btns.nativeElement.click();
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('toggleProfile() => search btns[0] and click, then must be call', () => {
    const mock = spyOn(shopService, 'toggleProfile').and.callFake(() => {});
    mock.calls.reset();
    const btns = fixture.debugElement.query(By.css('button.btn-profile'));
    btns.nativeElement.click();
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
