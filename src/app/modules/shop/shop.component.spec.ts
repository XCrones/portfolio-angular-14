import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderService } from 'src/app/services/header/header.service';
import { IInfoProject } from '../info-project/interfaces/info-project/i-info-project';
import { InfoProjectService } from '../info-project/services/info-project/info-project.service';
import { ProjectsService } from '../projects/services/projects/projects.service';
import { AboutProjectService } from './services/aboutProject/about-project.service';
import { PopupService } from './services/popup/popup.service';
import { ShopComponent } from './shop.component';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let aboutProjectService: AboutProjectService;
  let popupService: PopupService;

  const mockHeaderService = jasmine.createSpyObj(['isHide']);
  const mockProjectsService = jasmine.createSpyObj(['isHide']);
  const mockInfoProjectService = jasmine.createSpyObj(['isHide']);

  mockHeaderService.isHide.and.callFake((bool: boolean) => {});
  mockProjectsService.isHide.and.callFake((bool: boolean) => {});
  mockInfoProjectService.isHide.and.callFake((bool: boolean) => {});

  const mockAboutProjectService = {
    get about(): IInfoProject[] {
      return [];
    },
  };

  const mockPopupService = {
    get isHide(): boolean {
      return false;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: InfoProjectService, useValue: mockInfoProjectService },
        { provide: PopupService, useValue: mockPopupService },
        { provide: AboutProjectService, useValue: mockAboutProjectService },
        { provide: HeaderService, useValue: mockHeaderService },
        { provide: ProjectsService, useValue: mockInfoProjectService },
      ],
      declarations: [ShopComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    aboutProjectService = TestBed.inject(AboutProjectService);
    popupService = TestBed.inject(PopupService);

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockHeaderService.isHide.calls.reset();
    mockProjectsService.isHide.calls.reset();
    mockInfoProjectService.isHide.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
