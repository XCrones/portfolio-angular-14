import { TestBed } from '@angular/core/testing';

import { InfoProjectService } from './info-project.service';

describe('InfoProjectService', () => {
  let service: InfoProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isHide() => should be default is true, isHide(true|false) return true|false', () => {
    expect(service.isHide()).toBeTruthy();
    expect(service.isHide(false)).toBeFalsy();
    expect(service.isHide(true)).toBeTruthy();
  });
});
