import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header/header.service';
import { IInfoProject } from '../info-project/interfaces/info-project/i-info-project';
import { InfoProjectService } from '../info-project/services/info-project/info-project.service';
import { ProjectsService } from '../projects/services/projects/projects.service';
import { AboutProjectService } from './services/aboutProject/about-project.service';
import { ModalService } from './services/modal/modal.service';
import { PopupService } from './services/popup/popup.service';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let router: Router;

  const mockHeaderService = jasmine.createSpyObj(['isHide']);
  const mockProjectsService = jasmine.createSpyObj(['isHide']);
  const mockModalService = jasmine.createSpyObj(['isHide']);
  const mockPopupService = jasmine.createSpyObj(['isHide']);
  const mockInfoProjectService = jasmine.createSpyObj(['isHide']);
  const mockRouter = jasmine.createSpyObj(['router']);

  const mockAboutProjectService = {
    get about(): IInfoProject[] {
      return [];
    },
  };

  mockModalService.isHide.and.returnValue(true);
  mockPopupService.isHide.and.returnValue(true);
  mockInfoProjectService.isHide.and.returnValue(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: HeaderService, useValue: mockHeaderService },
        { provide: ProjectsService, useValue: mockProjectsService },
        { provide: ModalService, useValue: mockModalService },
        { provide: PopupService, useValue: mockPopupService },
        { provide: InfoProjectService, useValue: mockInfoProjectService },
        { provide: AboutProjectService, useValue: mockAboutProjectService },
        { proide: Router, useValue: mockRouter },
      ],
      declarations: [TodoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
