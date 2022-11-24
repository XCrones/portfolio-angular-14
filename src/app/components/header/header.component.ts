import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { NeonService } from 'src/app/services/neon/neon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          top: '70px',
        })
      ),
      state(
        'closed',
        style({
          top: '-150px',
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('* => open', [animate('0.5s')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  private _isOpenHamburger = false;

  constructor(private _neonService: NeonService) {}

  ngOnInit(): void {
    let width = window.innerWidth;
    this.hideHamburger(width);
  }

  get neon(): boolean {
    return this._neonService.isEnable();
  }
  get hamburger(): boolean {
    return this._isOpenHamburger;
  }

  toggleNeon() {
    this._neonService.isEnable(!this._neonService.isEnable());
  }

  toggleHamburger() {
    this._isOpenHamburger = !this._isOpenHamburger;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hideHamburger(event.target.innerWidth);
  }

  hideHamburger(width: number) {
    if (width >= 768) {
      this._isOpenHamburger = false;
    }
  }
}
