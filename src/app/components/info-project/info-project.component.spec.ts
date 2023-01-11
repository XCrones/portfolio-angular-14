import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NeonService } from 'src/app/services/neon/neon.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { TextNeonDirective } from '../ui/text-neon/text-neon.directive';

import { InfoProjectComponent } from './info-project.component';
import { InfoProjectService } from './services/info-project/info-project.service';

describe('InfoProjectComponent', () => {
  let component: InfoProjectComponent;
  let fixture: ComponentFixture<InfoProjectComponent>;

  const mockShadowService = jasmine.createSpyObj(['getTextNeon']);
  mockShadowService.getTextNeon.and.returnValue('');

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  const mockInfoProjectService = jasmine.createSpyObj(['isHide']);
  mockInfoProjectService.isHide.and.callFake((state: Boolean) => {});

  const testNameProject = 'test name project';
  const testTitle = 'test title';
  const testSubTitle = 'test subtitle';
  const testParseData = {
    title: testTitle,
    subtitle: [testSubTitle, testSubTitle, testSubTitle],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: InfoProjectService, useValue: mockInfoProjectService },
        { provide: NeonService, useValue: mockNeonService },
        { provide: ShadowService, useValue: mockShadowService },
      ],
      declarations: [InfoProjectComponent, TextNeonDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoProjectComponent);
    component = fixture.componentInstance;

    component.info = [{ nameProject: testNameProject }, testParseData];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('neonState() => must return true', () => {
    expect(component.neonState).toBeTruthy();
  });

  it('close() => must be call isHide(true)', () => {
    component.close();
    expect(mockInfoProjectService.isHide).toHaveBeenCalledWith(true);
  });

  it('nameProject() => must be return testNameProject', () => {
    expect(component.nameProject).toEqual(testNameProject);
  });

  it('tempData() => return must be equal testParseData ', () => {
    expect(component.tempData[0]).toEqual(testParseData);
  });
});
