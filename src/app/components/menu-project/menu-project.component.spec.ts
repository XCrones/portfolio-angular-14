import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header/header.service';
import { NeonService } from 'src/app/services/neon/neon.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { InfoProjectService } from '../info-project/services/info-project/info-project.service';
import { BoxNeonDirective } from '../ui/box-neon/box-neon.directive';
import { RotateDirective } from '../ui/rotate/rotate.directive';
import { TextNeonDirective } from '../ui/text-neon/text-neon.directive';

import { MenuProjectComponent } from './menu-project.component';

describe('MenuProjectComponent', () => {
  let component: MenuProjectComponent;
  let fixture: ComponentFixture<MenuProjectComponent>;

  let neonService: NeonService;
  let shadowService: ShadowService;
  let headerService: HeaderService;
  let infoProjectService: InfoProjectService;
  let router: Router;

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  const mockShadowService = jasmine.createSpyObj(['getTextNeon', 'getBoxNeon']);
  mockShadowService.getTextNeon.and.returnValue('#fff');
  mockShadowService.getBoxNeon.and.returnValue('#fff');

  const mockInfoProjectService = jasmine.createSpyObj(['isHide']);
  mockInfoProjectService.isHide.and.callFake((v?: boolean): boolean => {
    return true;
  });

  const mockHeaderService = jasmine.createSpyObj(['isHide']);
  mockHeaderService.isHide.and.callFake((v?: boolean): boolean => {
    return true;
  });

  const mockRouter = jasmine.createSpyObj(['navigate']);
  mockRouter.navigate.and.callFake((arr: string[]) => {});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuProjectComponent,
        TextNeonDirective,
        BoxNeonDirective,
        RotateDirective,
      ],
      providers: [
        { provide: NeonService, useValue: mockNeonService },
        { provide: ShadowService, useValue: mockShadowService },
        { provide: HeaderService, useValue: mockHeaderService },
        { provide: InfoProjectService, useValue: mockInfoProjectService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    neonService = TestBed.inject(NeonService);
    shadowService = TestBed.inject(ShadowService);
    headerService = TestBed.inject(HeaderService);
    infoProjectService = TestBed.inject(InfoProjectService);

    fixture = TestBed.createComponent(MenuProjectComponent);
    component = fixture.componentInstance;

    mockNeonService.isEnable.calls.reset();
    mockShadowService.getTextNeon.calls.reset();
    mockShadowService.getBoxNeon.calls.reset();
    mockInfoProjectService.isHide.calls.reset();
    mockHeaderService.isHide.calls.reset();
    mockRouter.navigate.calls.reset();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navBack() => search btn and click, then must be call navigate with [`projects`]', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-back'));
    btn.nativeElement.click();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['projects']);
  });

  it('toggleHideHeader() => search btn and click, then must be call headerService.isHide(!bool)', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-hide'));
    mockHeaderService.isHide.calls.reset();
    btn.nativeElement.click();
    expect(mockHeaderService.isHide).toHaveBeenCalledTimes(2);
  });

  it('showAbout() => search btn and click, then must be call infoProjectService.isHide(!bool)', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-about'));
    mockInfoProjectService.isHide.calls.reset();
    btn.nativeElement.click();
    expect(mockInfoProjectService.isHide).toHaveBeenCalledTimes(2);
  });
});
