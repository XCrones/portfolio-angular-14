import { TestBed } from '@angular/core/testing';
import { ICategories } from '../../interfaces/categories/i-categories';

import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updateCategories(category) => must be add cegory first index and none', () => {
    const arr = ['curr', 'a', 'b', 'c', 'none'];
    const data: ICategories = {
      items: ['a', 'b', 'c'],
      currCategori: 'curr',
    };
    expect(service.updateCategories(data)).toEqual(arr);
  });
});
