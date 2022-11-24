import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShadowService {
  constructor() {}

  private _mainShadowRedLink: string = '#ff2121';
  private _mainShadowRed: string = '#ff3c00';

  get mainShadowRedLink(): string {
    return this._mainShadowRedLink;
  }

  get mainShadowRed(): string {
    return this._mainShadowRed;
  }

  textShadowLight(color: string): string {
    return `0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 2px ${color}`;
  }

  textShadowMedium(color: string): string {
    return `0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 6px ${color}`;
  }

  textShadowHight(color: string): string {
    return `0 0 2px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 8px ${color}`;
  }

  boxShadowLight(color: string): string {
    return `0 0 0.1rem ${color}, 0 0 0.1rem ${color}, 0 0 0.8rem ${color}, 0 0 0.1rem ${color}, 0 0 0.1rem ${color}`;
  }

  boxShadowMedium(color: string): string {
    return `0 0 0.1rem ${color}, 0 0 0.1rem ${color}, 0 0 1rem ${color}, 0 0 0.1rem ${color}, 0 0 1.4rem ${color}`;
  }

  boxShadowHight(color: string): string {
    return `0 0 0.1rem ${color}, 0 0 0.1rem ${color}, 0 0 1rem ${color}, 0 0 0.1rem ${color}, 0 0 1.4rem ${color}`;
  }

  getBoxNeon(style: string, color: string): string {
    let tempStyle = style.toLowerCase().trim();
    switch (tempStyle) {
      case 'light':
        return this.boxShadowLight(color);
      case 'medium':
        return this.boxShadowMedium(color);
      case 'hight':
        return this.boxShadowHight(color);
      default:
        return '';
    }
  }

  getTextNeon(style: string, color: string): string {
    let tempStyle = style.toLowerCase().trim();
    switch (tempStyle) {
      case 'light':
        return this.textShadowLight(color);
      case 'medium':
        return this.textShadowMedium(color);
      case 'hight':
        return this.textShadowHight(color);
      default:
        return '';
    }
  }
}
