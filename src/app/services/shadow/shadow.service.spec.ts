import { TestBed } from '@angular/core/testing';

import { ShadowService } from './shadow.service';

describe('ShadowService', () => {
  let service: ShadowService;

  const textLight = (color: string) =>
    `0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 1px ${color}, 0 0 2px ${color}`;
  const textMedium = (color: string) =>
    `0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 2px ${color}, 0 0 6px ${color}`;
  const textHight = (color: string) =>
    `0 0 2px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 4px ${color}, 0 0 8px ${color}`;
  const boxLight = (color: string) =>
    `0 0 0.1rem ${color}, 0 0 0.1rem ${color}, 0 0 0.8rem ${color}, 0 0 0.1rem ${color}, 0 0 0.1rem ${color}`;
  const boxMedium = (color: string) =>
    `0 0 0.1rem ${color}, 0 0 0.1rem ${color}, 0 0 1rem ${color}, 0 0 0.1rem ${color}, 0 0 1.4rem ${color}`;
  const boxHight = (color: string) =>
    `0 0 0.1rem ${color}, 0 0 0.1rem ${color}, 0 0 1rem ${color}, 0 0 0.1rem ${color}, 0 0 1.4rem ${color}`;

  const testColor = '#fff';
  const testLight = 'light';
  const testMedium = 'medium';
  const testHight = 'hight';
  const testEmpty = '';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('textShadowLight(color) => must make and return colors (light|medium|hight)', () => {
    const getNeonLight = service.textShadowLight(testColor);
    expect(getNeonLight).toEqual(textLight(testColor));

    const getNeonMedium = service.textShadowMedium(testColor);
    expect(getNeonMedium).toEqual(textMedium(testColor));

    const getNeonHight = service.textShadowHight(testColor);
    expect(getNeonHight).toEqual(textHight(testColor));
  });

  it('boxShadowLight(color) => must make and return colors (light|medium|hight)', () => {
    const getNeonLight = service.boxShadowLight(testColor);
    expect(getNeonLight).toEqual(boxLight(testColor));

    const getNeonMedium = service.boxShadowMedium(testColor);
    expect(getNeonMedium).toEqual(boxMedium(testColor));

    const getNeonHight = service.boxShadowHight(testColor);
    expect(getNeonHight).toEqual(boxHight(testColor));
  });

  it('getBoxNeon(type, color) => must make and return colors (light|medium|hight)', () => {
    const getNeonLight = service.getBoxNeon(testLight, testColor);
    expect(getNeonLight).toEqual(boxLight(testColor));

    const getNeonMedium = service.getBoxNeon(testMedium, testColor);
    expect(getNeonMedium).toEqual(boxMedium(testColor));

    const getNeonHight = service.getBoxNeon(testHight, testColor);
    expect(getNeonHight).toEqual(boxHight(testColor));

    const getNeonUndefined = service.getBoxNeon(testEmpty, testColor);
    expect(getNeonUndefined).toEqual(testEmpty);
  });

  it('getTextNeon(type, color) => must make and return colors (light|medium|hight)', () => {
    const getNeonLight = service.getTextNeon(testLight, testColor);
    expect(getNeonLight).toEqual(textLight(testColor));

    const getNeonMedium = service.getTextNeon(testMedium, testColor);
    expect(getNeonMedium).toEqual(textMedium(testColor));

    const getNeonHight = service.getTextNeon(testHight, testColor);
    expect(getNeonHight).toEqual(textHight(testColor));

    const getNeonUndefined = service.getTextNeon(testEmpty, testColor);
    expect(getNeonUndefined).toEqual(testEmpty);
  });
});
