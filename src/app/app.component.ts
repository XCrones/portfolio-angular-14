import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { HeaderService } from './services/header/header.service';
import { NeonService } from './services/neon/neon.service';
import { ShadowService } from './services/shadow/shadow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'winClose',
        style({
          top: '-100%',
        })
      ),
      state(
        'winOpen',
        style({
          top: '0%',
        })
      ),
      transition('winOpen <=> winClose', [
        animate('0.4s cubic-bezier(.35, 0, .25, 1)'),
      ]),
    ]),
  ],
})
export class AppComponent {
  constructor(
    private readonly _neonService: NeonService,
    private readonly _headerService: HeaderService,
    private readonly _shadowService: ShadowService
  ) {}

  get isHideHeader(): boolean {
    return this._headerService.isHide();
  }
  get neonState(): boolean {
    return this._neonService.isEnable();
  }
  get mainColor(): string {
    return this._shadowService.mainShadowRed;
  }
}
