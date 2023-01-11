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
  selector: '[appTextNeon]',
})
export class TextNeonDirective implements OnChanges, OnInit {
  @Input() tIsNeonEnable: boolean | void | undefined;
  @Input() textColorShadow: string = '';
  @Input() textStyleShadow: string = '';
  @Input() textColor: string = '';
  @Input() textSetColor: boolean = false;
  @Input() textHover: boolean = false;

  @HostBinding('style.textShadow') styleTextShadow: string = '';
  @HostBinding('style.color') styleColor: string = '';

  constructor(private readonly _shadowService: ShadowService) {}

  ngOnInit(): void {
    if (!this.textHover) {
      this.setShadow();
      if (this.textSetColor) {
        this.setColor();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.textHover) {
      this.setShadow();
      if (this.textSetColor) {
        this.setColor();
      }
    }

    let hasKeyNeon = Object.prototype.hasOwnProperty.call(
      changes,
      'tIsNeonEnable'
    );
    if (hasKeyNeon) {
      if (changes['tIsNeonEnable'].currentValue && !this.textHover) {
        this.setShadow();
      } else {
        this.clearShadow();
      }
    }
  }

  @HostListener('mouseover') onMouseOver() {
    if (this.textHover) {
      this.setShadow();
      if (this.textSetColor) {
        this.setColor();
      }
    }
  }

  @HostListener('mouseout') onMouseOut() {
    if (this.textHover) {
      this.clearShadow();
      if (this.textSetColor) {
        this.clearColor();
      }
    }
  }

  setShadow() {
    if (this.tIsNeonEnable && this.textColorShadow.length > 0) {
      let neon = this._shadowService.getTextNeon(
        this.textStyleShadow,
        this.textColorShadow
      );
      this.styleTextShadow = neon != undefined ? neon : '';
    }
  }
  clearShadow() {
    this.styleTextShadow = '';
  }
  setColor() {
    if (this.textColor.length > 0) {
      this.styleColor = this.textColor;
    }
  }
  clearColor() {
    this.styleColor = '';
  }
}
