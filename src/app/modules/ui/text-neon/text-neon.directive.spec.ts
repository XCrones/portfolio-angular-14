import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { TextNeonDirective } from './text-neon.directive';

describe('TextNeonDirective', () => {
  it('should create an instance', () => {
    const directive = new TextNeonDirective(new ShadowService());
    expect(directive).toBeTruthy();
  });

  it('onMouseOver() => if boxHover equal true must be call setShadow() and not called setColor()', () => {
    const directive = new TextNeonDirective(new ShadowService());
    directive.textHover = true;

    spyOn(directive, 'setShadow').and.callFake(() => {});
    spyOn(directive, 'setColor').and.callFake(() => {});

    directive.onMouseOver();
    expect(directive.setShadow).toHaveBeenCalled();
    expect(directive.setColor).not.toHaveBeenCalled();
  });

  it('onMouseOver() => if boxHover equal true must be call setShadow() and called setColor', () => {
    const directive = new TextNeonDirective(new ShadowService());
    directive.textHover = true;
    directive.textSetColor = true;

    spyOn(directive, 'setShadow').and.callFake(() => {});
    spyOn(directive, 'setColor').and.callFake(() => {});

    directive.onMouseOver();
    expect(directive.setShadow).toHaveBeenCalled();
    expect(directive.setColor).toHaveBeenCalled();
  });

  it('onMouseOut() => if boxHover equal true must be call clearShadow() and not called clearColor', () => {
    const directive = new TextNeonDirective(new ShadowService());
    directive.textHover = true;
    directive.textSetColor = false;

    spyOn(directive, 'clearShadow').and.callFake(() => {});
    spyOn(directive, 'clearColor').and.callFake(() => {});

    directive.onMouseOut();
    expect(directive.clearShadow).toHaveBeenCalled();
    expect(directive.clearColor).not.toHaveBeenCalled();
  });

  it('onMouseOut() => if boxHover equal true must be call clearShadow() and called clearColor', () => {
    const directive = new TextNeonDirective(new ShadowService());
    directive.textHover = true;
    directive.textSetColor = true;

    spyOn(directive, 'clearShadow').and.callFake(() => {});
    spyOn(directive, 'clearColor').and.callFake(() => {});

    directive.onMouseOut();
    expect(directive.clearShadow).toHaveBeenCalled();
    expect(directive.clearColor).toHaveBeenCalled();
  });

  it('clearShadow() => styleBoxShadow must be clear', () => {
    const directive = new TextNeonDirective(new ShadowService());
    directive.styleTextShadow = 'test';
    directive.clearShadow();
    expect(directive.styleTextShadow).toEqual('');
  });

  it('clearBorder() => styleBorderColor must be clear', () => {
    const directive = new TextNeonDirective(new ShadowService());
    directive.styleColor = 'test';
    directive.clearColor();
    expect(directive.styleColor).toEqual('');
  });
});
