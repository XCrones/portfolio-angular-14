import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { RotateDirective } from './rotate.directive';

describe('RotateDirective', () => {
  it('should create an instance', () => {
    const directive = new RotateDirective(new ShadowService());
    expect(directive).toBeTruthy();
  });

  it('onMouseOver() => if boxHover equal true must be call setShadow() and not called setColor()', () => {
    const directive = new RotateDirective(new ShadowService());
    directive.isRotate = true;
    directive.rHoverTextShadow = true;
    directive.rIsNeonEnable = true;
    directive.rHoverTextColor = false;

    spyOn(directive, 'setShadow').and.callFake(() => {});
    spyOn(directive, 'setColor').and.callFake(() => {});

    directive.onMouserOver();
    expect(directive.setShadow).toHaveBeenCalled();
    expect(directive.setColor).not.toHaveBeenCalled();
  });

  it('onMouseOver() => if boxHover equal true must be call not setShadow() and called setColor()', () => {
    const directive = new RotateDirective(new ShadowService());
    directive.isRotate = true;
    directive.rHoverTextShadow = false;
    directive.rIsNeonEnable = false;
    directive.rHoverTextColor = true;

    spyOn(directive, 'setShadow').and.callFake(() => {});
    spyOn(directive, 'setColor').and.callFake(() => {});

    directive.onMouserOver();
    expect(directive.setShadow).not.toHaveBeenCalled();
    expect(directive.setColor).toHaveBeenCalled();
  });

  it('onMouseOut() => if boxHover equal true must be call clearShadow() and not called clearColor', () => {
    const directive = new RotateDirective(new ShadowService());
    directive.isRotate = true;
    directive.rHoverTextShadow = true;
    directive.rIsNeonEnable = true;
    directive.rHoverTextColor = false;

    spyOn(directive, 'clearShadow').and.callFake(() => {});
    spyOn(directive, 'clearColor').and.callFake(() => {});

    directive.onMouseOut();
    expect(directive.clearShadow).toHaveBeenCalled();
    expect(directive.clearColor).not.toHaveBeenCalled();
  });

  it('onMouseOut() => if boxHover equal true must be not call clearShadow() and called clearColor', () => {
    const directive = new RotateDirective(new ShadowService());
    directive.isRotate = true;
    directive.rHoverTextShadow = false;
    directive.rIsNeonEnable = false;
    directive.rHoverTextColor = true;

    spyOn(directive, 'clearShadow').and.callFake(() => {});
    spyOn(directive, 'clearColor').and.callFake(() => {});

    directive.onMouseOut();
    expect(directive.clearShadow).not.toHaveBeenCalled();
    expect(directive.clearColor).toHaveBeenCalled();
  });

  it('clearShadow() => styleBoxShadow must be clear', () => {
    const directive = new RotateDirective(new ShadowService());
    directive.styleTextShadow = 'test';
    directive.clearShadow();
    expect(directive.styleTextShadow).toEqual('');
  });

  it('clearBorder() => styleBorderColor must be clear', () => {
    const directive = new RotateDirective(new ShadowService());
    directive.styleTextColor = 'test';
    directive.clearColor();
    expect(directive.styleTextColor).toEqual('');
  });

  it('setColor() => styleTextColor must be equal #fff', () => {
    const directive = new RotateDirective(new ShadowService());
    directive.styleTextColor = '#fff';
    directive.setColor();
    expect(directive.styleTextColor).toEqual('#fff');
  });

  it('setColor() => styleTextColor must be equal #f0f0f0', () => {
    const directive = new RotateDirective(new ShadowService());
    directive.rColor = '#f0f0f0';
    directive.styleTextColor = '#fff';
    directive.setColor();
    expect(directive.styleTextColor).toEqual('#f0f0f0');
  });
});
