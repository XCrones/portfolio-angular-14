import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsV2Service } from './products-v2.service';
import { API_BASE_URL, apiBaseUrl } from '../../apiUrl';

describe('ProductsV2Service', () => {
  let service: ProductsV2Service;
  let api: HttpTestingController;

  const testFilter = 'test filter';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: API_BASE_URL, useValue: apiBaseUrl }],
    });
    service = TestBed.inject(ProductsV2Service);
    TestBed.inject(API_BASE_URL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('filters => not equal undefined or null', () => {
    expect(service.filters.length).not.toBeUndefined();
    expect(service.filters.length).not.toBeNull();
  });

  it('currFilter(string) => set value -> value must be equal', () => {
    service.currFilter = testFilter;
    expect(service.currFilter).toEqual(testFilter);
  });

  it('isHideFilters(bool) => should be default is false, isHideFilters(true|false) return true|false', () => {
    service.isHideFilters = false;
    expect(service.isHideFilters).toBeFalsy();
  });

  it('stateCurrFilter(bool) => should be default is true, stateCurrFilter(true|false) return true|false', () => {
    service.stateCurrFilter = false;
    expect(service.stateCurrFilter).toBeFalsy();
  });

  it('search(string) => should be default is length = 0, must be equals', () => {
    service.search = testFilter;
    expect(service.search).toEqual(testFilter);
  });
});
