import { TestBed } from '@angular/core/testing';

import { PaginatorV2Service } from './paginatorV2.service';

describe('PaginatorV2Service', () => {
  let service: PaginatorV2Service;

  const testArr = [1, 2, 3, 4, 5];
  const testEmptyArr = [undefined];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginatorV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('pages(emtyArr) => must be return [undefined]', () => {
    const pages = service.pages(testEmptyArr);
    expect(pages).toEqual([undefined]);
  });

  it('pages(arr) => must be return [undefined * arr / 4], 4 - default', () => {
    const pages = service.pages(testArr);
    expect(pages).toEqual([undefined, undefined]);
  });

  it('parse(emptArr) => must be return [undefined]', () => {
    const parse = service.parse(testEmptyArr);
    expect(parse).toEqual([undefined]);
  });

  it('pages(arr) => must be return [undefined * arr / 4], 4 - default', () => {
    const parse = service.parse(testArr);
    expect(parse).toEqual([1, 2, 3, 4]);
  });

  it('isEqualPage(0) => must return true', () => {
    const isEqual = service.isEqualPage(0);
    expect(isEqual).toBeTruthy();
  });

  it('setCurrPage(2) => isEqualPage(2) must return true', () => {
    service.setCurrPage(2);
    expect(service.isEqualPage(2)).toBeTruthy();
  });
});
