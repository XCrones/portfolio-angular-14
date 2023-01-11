import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { ProfileService } from 'src/app/pages/shop/services/profile/profile.service';
import { ShopService } from 'src/app/pages/shop/services/shop/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          top: '100%',
        })
      ),
      state(
        'closed',
        style({
          top: '-30%',
          scale: '0',
          opacity: '0',
        })
      ),
      state(
        'winClose',
        style({
          right: '-100%',
          opacity: '0',
        })
      ),
      state(
        'winOpen',
        style({
          right: '0%',
          opacity: '1',
        })
      ),
      transition('open => closed', [animate('0.3s')]),
      transition('* => open', [animate('0.3s')]),
      transition('winOpen <=> winClose', [
        animate('0.4s cubic-bezier(.35, 0, .25, 1)'),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  private _isHideHamburger: boolean = true;

  constructor(
    private _profileService: ProfileService,
    private _authService: AuthService,
    private _shopService: ShopService
  ) {}

  ngOnInit(): void {}

  get sumCart(): number {
    return this._profileService.unparsingCart.length;
  }
  get isHideCart(): boolean {
    return this._shopService.cartIsHide;
  }
  get isHideProfile(): boolean {
    return this._shopService.profileIsHide;
  }
  get isAuth(): boolean {
    return this._authService.isAuth;
  }
  get isOpenhamburger(): boolean {
    return this._isHideHamburger;
  }

  toggleHamburger() {
    this._isHideHamburger = !this._isHideHamburger;
  }

  toggleCart() {
    this._shopService.toggleCart();
  }
  toggleProfile() {
    this._shopService.toggleProfile();
  }
}
