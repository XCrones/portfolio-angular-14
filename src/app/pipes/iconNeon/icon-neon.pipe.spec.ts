import { IconNeonPipe } from './icon-neon.pipe';

describe('IconNeonPipe', () => {
  it('create an instance', () => {
    const pipe = new IconNeonPipe();
    expect(pipe).toBeTruthy();
  });

  it('if arg true return lightbulb', () => {
    const pipe = new IconNeonPipe();
    expect(pipe.transform(true)).toEqual('lightbulb');
  });

  it('if arg false return lightbulb_outline', () => {
    const pipe = new IconNeonPipe();
    expect(pipe.transform(false)).toEqual('lightbulb_outline');
  });
});
