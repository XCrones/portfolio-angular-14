import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { NeonService } from 'src/app/services/neon/neon.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { IUnparsingCart } from '../../interfaces/unparsing-cart/i-unparsing-cart';
import { ProfileService } from '../../services/profile/profile.service';
import { ShopService } from '../../services/shop/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [PaginatorV2Service],
})
export class CartComponent implements OnInit {
  @Output() errAuth = new EventEmitter<void>();
  @Output() showProfile = new EventEmitter<void>();

  private _titleLength: number = 30;
  readonly pathload: string = '../../../../assets/img/load.svg';

  constructor(
    private _profileService: ProfileService,
    private _neonService: NeonService,
    private _paginatorService: PaginatorV2Service,
    private _authService: AuthService,
    private _shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.paginator.init();
    let width = window.innerWidth;
    this.resizeLengthTitle(width);
  }

  get paginator(): any {
    return this._paginatorService;
  }
  get neonState(): boolean {
    return this._neonService.isEnable();
  }
  get cart(): Array<IUnparsingCart> {
    return this._profileService.unparsingCart;
  }
  get totalPrice(): number {
    return this._profileService.totalPrice;
  }
  get isLoadData(): boolean {
    return this._profileService.isLoadDataCart;
  }
  get titleLength(): number {
    return this._titleLength;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let width = event.target.innerWidth;
    this.resizeLengthTitle(width);
  }

  resizeLengthTitle(width: number) {
    if (width < 640) {
      this._titleLength = 15;
    } else {
      this._titleLength = 30;
    }
  }

  buy() {
    if (this._authService.isAuth) {
      if (this.cart.length > 0) {
        this._profileService.buy();
        this.showProfile.emit();
      }
    } else {
      this.errAuth.emit();
    }
  }

  closeCart() {
    this._shopService.toggleCart();
  }

  decrementItem(id: number) {
    this._profileService.decrement(id);
  }

  incrementItem(id: number) {
    this._profileService.increment(id);
  }

  deleteItem(id: number) {
    this._profileService.deleteItem(id);
  }
}
