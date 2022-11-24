import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { NeonService } from 'src/app/services/neon/neon.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { ProfileService } from '../../services/profile/profile.service';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { ShopService } from '../../services/shop/shop.service';
import { IPurchasesItem } from '../../interfaces/purchases-item/i-purchases-item';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [PaginatorV2Service],
})
export class ProfileComponent implements OnInit {
  readonly pathload: string = '../../../../assets/img/load.svg';

  constructor(
    private _neonService: NeonService,
    private _profileService: ProfileService,
    private _paginatorService: PaginatorV2Service,
    private _authService: AuthService,
    private _purchaseService: PurchaseService,
    private _shopService: ShopService
  ) {}

  ngOnInit(): void {
    let width = window.innerWidth;
    this.resizePaginator(width);
  }

  get neon(): boolean {
    return this._neonService.isEnable();
  }
  get purchases(): IPurchasesItem[] {
    return this._profileService.purchases;
  }
  get paginator(): any {
    return this._paginatorService;
  }
  get purchaseIsHide(): boolean {
    return this._purchaseService.isHide();
  }
  get isAuth(): boolean {
    return this._authService.isAuth;
  }
  get isLoadData(): boolean {
    return this._profileService.isLoadDataPurchases;
  }
  get userName(): string | undefined {
    return this._authService.userName;
  }

  signOut() {
    this._authService.signOut();
    this._profileService.profileSignOut();
  }

  openPurchase(obj: IPurchasesItem) {
    this._purchaseService.open(obj);
  }

  totalPrice(item: IPurchasesItem): number {
    return item.products.reduce(function (sum, current) {
      return sum + current.price * current.count;
    }, 0);
  }

  getUser(uid: string) {
    this._profileService.tryProfile(uid);
  }

  isCloseProfile() {
    this._shopService.toggleProfile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let width = event.target.innerWidth;
    this.resizePaginator(width);
  }
  resizePaginator(width: number) {
    if (width < 640) {
      this.paginator.init(6);
    } else {
      this.paginator.init(5);
    }
  }
}
