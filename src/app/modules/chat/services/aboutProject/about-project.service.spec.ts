import { TestBed } from '@angular/core/testing';

import { AboutProjectService } from './about-project.service';

describe('AboutProjectService', () => {
  let service: AboutProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
