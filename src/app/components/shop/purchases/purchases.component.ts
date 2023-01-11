import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISelectPurchase } from 'src/app/pages/shop/interfaces/select-purchase/i-select-purchase';
import { PurchaseService } from 'src/app/pages/shop/services/purchase/purchase.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
  providers: [PaginatorV2Service],
})
export class PurchasesComponent implements OnInit, OnDestroy {
  private _titleLength: number = 30;
  private _purchase!: ISelectPurchase;
  private _purchase$!: Subscription;

  constructor(
    private _paginatorService: PaginatorV2Service,
    private _purchaseService: PurchaseService
  ) {
    this._purchase$ = this._purchaseService.purchase.subscribe((observer) => {
      this._purchase = observer;
    });
  }
  ngOnInit(): void {
    this.paginator.init();
    let width = window.innerWidth;
    this.resizeLengthTitle(width);
  }

  ngOnDestroy(): void {
    this._purchase$.unsubscribe();
  }

  get paginator(): any {
    return this._paginatorService;
  }
  get purchases(): ISelectPurchase {
    return this._purchase;
  }
  get titleLength(): number {
    return this._titleLength;
  }

  exit() {
    this._purchaseService.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let width = event.target.innerWidth;
    this.resizeLengthTitle(width);
  }
  resizeLengthTitle(width: number) {
    if (width < 640) {
      this._titleLength = 20;
    } else {
      this._titleLength = 30;
    }
  }
}
