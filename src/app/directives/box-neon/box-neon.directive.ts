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
  selector: '[appBoxNeon]',
})
export class BoxNeonDirective implements OnChanges, OnInit {
  @Input() bIsNeonEnable: boolean = false;
  @Input() boxShadowColor: string = '';
  @Input() boxStyleShadow: string = '';
  @Input() boxColorBorder: string = '';
  @Input() boxSetBorder: boolean = false;
  @Input() boxHover: boolean = false;

  @HostBinding('style.boxShadow') styleBoxShadow: string = '';
  @HostBinding('style.borderColor') styleBorderColor: string = '';

  constructor(private readonly _shadowService: ShadowService) {}

  ngOnInit(): void {
    if (!this.boxHover) {
      this.setShadow();
      if (this.boxSetBorder) {
        this.setBorder();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    let hasKeyNeon = Object.prototype.hasOwnProperty.call(
      changes,
      'bIsNeonEnable'
    );
    if (!this.boxHover) {
      if (hasKeyNeon) {
        if (changes['bIsNeonEnable'].currentValue) {
          this.setShadow();
        } else {
          this.clearShadow();
        }
      }
    }
  }

  @HostListener('mouseover') onMouseOver() {
    if (this.boxHover) {
      this.setShadow();
      if (this.boxSetBorder) {
        this.setBorder();
      }
    }
  }

  @HostListener('mouseout') onMouseOut() {
    if (this.boxHover) {
      this.clearShadow();
      if (this.boxSetBorder) {
        this.clearBorder();
      }
    }
  }

  setShadow() {
    if (this.bIsNeonEnable && this.boxShadowColor.length > 0) {
      let neon = this._shadowService.getBoxNeon(
        this.boxStyleShadow,
        this.boxShadowColor
      );
      this.styleBoxShadow = neon != undefined ? neon : '';
    }
  }
  clearShadow() {
    this.styleBoxShadow = '';
  }
  setBorder() {
    if (this.boxColorBorder.length > 0) {
      this.styleBorderColor = this.boxColorBorder;
    }
  }
  clearBorder() {
    this.styleBorderColor = '';
  }
}
