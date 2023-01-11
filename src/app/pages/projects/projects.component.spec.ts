import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderService } from 'src/app/services/header/header.service';
import { NeonService } from 'src/app/services/neon/neon.service';

import { ProjectsComponent } from './projects.component';
import { ProjectsService } from './services/projects/projects.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  const mockHeaderService = jasmine.createSpyObj(['isHide']);
  mockHeaderService.isHide.and.callFake((bool: boolean) => {});

  const mockProjectsService = jasmine.createSpyObj(['isHide']);
  mockProjectsService.isHide.and.returnValue(false);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: ProjectsService, useValue: mockProjectsService },
        { provide: NeonService, useValue: mockNeonService },
        { provide: HeaderService, useValue: mockHeaderService },
      ],
      declarations: [ProjectsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleHideHeader() => must be call with(!bool), default value = true', () => {
    component.toggleHideHeader();
    expect(mockHeaderService.isHide).toHaveBeenCalledWith(true);
  });

  it('isHidePorjects() => must return false', () => {
    expect(component.isHidePorjects).toBeFalsy();
  });

  it('neonState() => must return true', () => {
    expect(component.neonState).toBeTruthy();
  });
});
