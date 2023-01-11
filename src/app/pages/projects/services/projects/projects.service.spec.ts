import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isHide() => should be default is false, isHide(true|false) return true|false', () => {
    expect(service.isHide()).toBeFalsy();
    expect(service.isHide(true)).toBeTruthy();
    expect(service.isHide(false)).toBeFalsy();
  });
});
