import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ProductsV2Service } from 'src/app/pages/shop/services/products_v2/products-v2.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'winClose',
        style({
          top: '-100%',
          scale: '0',
          opacity: '0',
        })
      ),
      state(
        'winOpen',
        style({
          top: '100%',
          scale: '1',
          opacity: '1',
        })
      ),
      transition('winOpen <=> winClose', [
        animate('0.4s cubic-bezier(.35, 0, .25, 1)'),
      ]),
    ]),
  ],
})
export class ToolsComponent implements OnInit {
  constructor(private _productsService: ProductsV2Service) {}

  ngOnInit(): void {}

  get currFilter(): string {
    return this._productsService.currFilter;
  }
  get isHideFilters(): boolean {
    return this._productsService.isHideFilters;
  }
  get filters(): string[] {
    return this._productsService.filters;
  }
  get stateCurrFilter(): boolean {
    return this._productsService.stateCurrFilter;
  }
  set search(value: string) {
    this._productsService.search = value;
  }

  toggleIsHideFilters() {
    this._productsService.isHideFilters = !this._productsService.isHideFilters;
  }
  toggleStateFilter() {
    this._productsService.stateCurrFilter =
      !this._productsService.stateCurrFilter;
  }
  setCurrFilter(filter: string) {
    this._productsService.currFilter = filter;
    this._productsService.isHideFilters = true;
  }
}
