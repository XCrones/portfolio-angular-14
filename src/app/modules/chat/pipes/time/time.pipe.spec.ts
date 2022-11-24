import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
  });

  it('transform(2022-11-12T15:23:09:232) => must return 15:23', () => {
    const pipe = new TimePipe();
    expect(pipe.transform('2022-11-12T15:23:09:232')).toEqual('15:23:09');
  });
});
