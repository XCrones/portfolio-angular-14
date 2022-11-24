import { TestBed } from '@angular/core/testing';

import { NeonService } from './neon.service';

describe('NeonService', () => {
  let service: NeonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isEnable() => should be default is true, isEnable(true|false) return true|false', () => {
    expect(service.isEnable()).toBeTruthy();
    expect(service.isEnable(true)).toBeTruthy();
    expect(service.isEnable(false)).toBeFalsy();
  });
});
