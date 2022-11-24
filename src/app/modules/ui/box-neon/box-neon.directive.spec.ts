import { BoxNeonDirective } from './box-neon.directive';
import { ShadowService } from 'src/app/services/shadow/shadow.service';

describe('BoxNeonDirective', () => {
  it('should create an instance', () => {
    const directive = new BoxNeonDirective(new ShadowService());
    expect(directive).toBeTruthy();
  });

  it('onMouseOver() => if boxHover equal true must be call setShadow() and not called setBorder', () => {
    const directive = new BoxNeonDirective(new ShadowService());
    directive.boxHover = true;

    spyOn(directive, 'setShadow').and.callFake(() => {});
    spyOn(directive, 'setBorder').and.callFake(() => {});

    directive.onMouseOver();
    expect(directive.setShadow).toHaveBeenCalled();
    expect(directive.setBorder).not.toHaveBeenCalled();
  });

  it('onMouseOver() => if boxHover equal true must be call setShadow() and called setBorder', () => {
    const directive = new BoxNeonDirective(new ShadowService());
    directive.boxHover = true;
    directive.boxSetBorder = true;

    spyOn(directive, 'setShadow').and.callFake(() => {});
    spyOn(directive, 'setBorder').and.callFake(() => {});

    directive.onMouseOver();
    expect(directive.setShadow).toHaveBeenCalled();
    expect(directive.setBorder).toHaveBeenCalled();
  });

  it('onMouseOut() => if boxHover equal true must be call clearShadow() and not called clearBorder', () => {
    const directive = new BoxNeonDirective(new ShadowService());
    directive.boxHover = true;
    directive.boxSetBorder = false;

    spyOn(directive, 'clearShadow').and.callFake(() => {});
    spyOn(directive, 'clearBorder').and.callFake(() => {});

    directive.onMouseOut();
    expect(directive.clearShadow).toHaveBeenCalled();
    expect(directive.clearBorder).not.toHaveBeenCalled();
  });

  it('onMouseOut() => if boxHover equal true must be call clearShadow() and called clearBorder', () => {
    const directive = new BoxNeonDirective(new ShadowService());
    directive.boxHover = true;
    directive.boxSetBorder = true;

    spyOn(directive, 'clearShadow').and.callFake(() => {});
    spyOn(directive, 'clearBorder').and.callFake(() => {});

    directive.onMouseOut();
    expect(directive.clearShadow).toHaveBeenCalled();
    expect(directive.clearBorder).toHaveBeenCalled();
  });

  it('clearShadow() => styleBoxShadow must be clear', () => {
    const directive = new BoxNeonDirective(new ShadowService());
    directive.styleBoxShadow = 'test';
    directive.clearShadow();
    expect(directive.styleBoxShadow).toEqual('');
  });

  it('clearBorder() => styleBorderColor must be clear', () => {
    const directive = new BoxNeonDirective(new ShadowService());
    directive.styleBorderColor = 'test';
    directive.clearBorder();
    expect(directive.styleBorderColor).toEqual('');
  });
});
