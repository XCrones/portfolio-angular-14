import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/pages/shop/services/popup/popup.service';
import { IProductsV2 } from 'src/app/pages/shop/services/products_v2/products-v2.service';
import { ProfileService } from 'src/app/pages/shop/services/profile/profile.service';
import { NeonService } from 'src/app/services/neon/neon.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  constructor(
    private _popupService: PopupService,
    private _profileService: ProfileService,
    private _neonServic: NeonService
  ) {}

  ngOnInit(): void {}

  closePopup() {
    this._popupService.close();
  }

  get neonState(): boolean {
    return this._neonServic.isEnable();
  }
  get product(): IProductsV2 {
    return this._popupService.product;
  }

  addCart(item: IProductsV2) {
    this._profileService.addCart(item);
  }

  isInCart(id: number): boolean {
    return this._profileService.isInCart(id);
  }

  calcRate(rate: number): number {
    return (rate * 100) / 5;
  }
  calcCount(count: number): number {
    return (count * 100) / 1000;
  }
}
