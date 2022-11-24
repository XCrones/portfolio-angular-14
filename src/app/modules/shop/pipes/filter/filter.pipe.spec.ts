import { IProductsV2 } from '../../interfaces/products_v2/i-products-v2';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform(arr, filter) => must return arr with includes filter', () => {
    const testSearch: string = 'test 1';

    const testItem1: IProductsV2 = {
      id: 0,
      title: 'test 1',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: {
        rate: 0,
        count: 0,
      },
    };

    const testItem2: IProductsV2 = {
      id: 0,
      title: 'title 2',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: {
        rate: 0,
        count: 0,
      },
    };

    const arr: Array<IProductsV2> = [testItem1, testItem2];

    const pipe = new FilterPipe();
    expect(pipe.transform(arr, testSearch)).toEqual([testItem1]);
  });
});
