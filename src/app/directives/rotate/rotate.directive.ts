import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ShadowService } from 'src/app/services/shadow/shadow.service';

@Directive({
  selector: '[appRotate]',
})
export class RotateDirective implements OnInit, OnChanges {
  @Input() isRotate: boolean = false;
  @Input() rIsNeonEnable: boolean | void | undefined;
  @Input() rFixColor: boolean = false;
  @Input() rColor: string = '';
  @Input() rFixTextShadow: boolean = false;
  @Input() rHoverTextShadow: boolean = false;
  @Input() rHoverTextColor: boolean = false;
  @Input() rColorTextShadow: string = '';
  @Input() rStyleTextSahdow: string = '';
  @Input() rHover: boolean = false;
  @HostBinding('style.color') styleTextColor: string = '';
  @HostBinding('style.textShadow') styleTextShadow: string = '';
  @HostBinding('style.transform') styleTransform: string = '';

  constructor(private _shadowService: ShadowService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    let hasKeyRotate = Object.prototype.hasOwnProperty.call(
      changes,
      'isRotate'
    );
    if (hasKeyRotate) {
      this.rotate();
    }
    let hasKeyNeon = Object.prototype.hasOwnProperty.call(
      changes,
      'rIsNeonEnable'
    );
    if (hasKeyNeon) {
      if (changes['rIsNeonEnable'].currentValue && !this.isRotate) {
        this.setShadow();
      } else {
        this.clearShadow();
      }
    }
  }
  @HostListener('mouseover') onMouserOver() {
    if (this.isRotate) {
      if (this.rHoverTextShadow && this.rIsNeonEnable) {
        this.setShadow();
      }
      if (this.rHoverTextColor) {
        this.setColor();
      }
    }
  }
  @HostListener('mouseout') onMouseOut() {
    if (this.isRotate) {
      if (this.rHoverTextShadow && this.rIsNeonEnable) {
        this.clearShadow();
      }
      if (this.rHoverTextColor) {
        this.clearColor();
      }
    }
  }
  rotate() {
    if (!this.isRotate) {
      this.styleTransform = 'rotate(-180deg)';
      if (this.rFixColor) {
        this.setColor();
        if (this.rFixTextShadow && this.rIsNeonEnable) {
          this.setShadow();
        }
      }
    } else {
      this.styleTransform = 'rotate(0)';
      if (this.rFixColor) {
        this.clearColor();
        if (this.rFixTextShadow) {
          this.clearShadow();
        }
      }
    }
  }

  setColor() {
    if (this.rColor.length > 0) {
      this.styleTextColor = this.rColor;
    }
  }

  setShadow() {
    let neon = this._shadowService.getTextNeon(
      this.rStyleTextSahdow,
      this.rColorTextShadow
    );
    this.styleTextShadow = neon === undefined ? '' : neon;
  }

  clearShadow() {
    this.styleTextShadow = '';
  }

  clearColor() {
    this.styleTextColor = '';
  }
}
