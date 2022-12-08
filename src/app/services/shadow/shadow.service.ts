import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShadowService {
  constructor() {}

  private _mainShadowRedLink: string = '#ff2121';
  private _mainShadowRed: string = '#ff3c00';
  private _greenNeon = '#00ff84';
  private _greenShadow = '#0fa';
  private _redNeon = '#ff2121';
  private _redShadow = '#ff3c00';
  private _blueNeon = '#214aff';
  private _blueShadow = '#0051ff';

  get mainShadowRedLink(): string {
    return this._mainShadowRedLink;
  get colorNeonGreen(): string {
    return this._greenNeon;
  }

  get mainShadowRed(): string {
    return this._mainShadowRed;
  get colorGreen(): string {
    return this._greenShadow;
  }
  get colorRedNeon(): string {
    return this._redNeon;
  }
  get colorRedShadow(): string {
    return this._redShadow;
  }
  get colorBlueNeon(): string {
    return this._blueNeon;
  }
  get colorBlueShadow(): string {
    return this._blueShadow;
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

  getColorProject(frameWork: string): string {
    const tempFrameWork = frameWork.toLowerCase().trim();
    switch (tempFrameWork) {
      case 'angular':
        return this._redShadow;
      case 'react':
        return this._blueShadow;
      case 'vue':
        return this._greenShadow;

      default:
        return '';
    }
  }
}
