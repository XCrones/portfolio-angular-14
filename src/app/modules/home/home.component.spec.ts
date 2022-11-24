import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextNeonDirective } from '../ui/text-neon/text-neon.directive';
import { NeonService } from 'src/app/services/neon/neon.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';

import { HomeComponent } from './home.component';
import { AboutMeService } from './services/about-me.service';
import { Skills } from './interfaces/skills';
import { AboutMe } from './interfaces/about-me';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockPaginatorV2Service = jasmine.createSpyObj([
    'init',
    'isEqualPage',
    'setCurrPage',
    'pages',
    'parse',
  ]);

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  const mockAboutMeService = {
    get mySkills(): Skills[] {
      return [];
    },
    get aboutMe(): AboutMe {
      return {
        title: '',
        frameWork: '',
        greetings: '',
        whatIsThis: '',
        search: [
          { about: ': ', goal: '' },
          { about: ': ', goal: '' },
          { about: ': ', goal: '' },
        ],
        subtitle: '',
      };
    },
  };

  const mockShadowService = {
    get mainShadowRed(): string {
      return 'test color';
    },
    get mainShadowRedLink(): string {
      return 'test color';
    },
    getTextNeon(color: string): string {
      return ``;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: AboutMeService, useValue: mockAboutMeService },
        { provide: NeonService, useValue: mockNeonService },
        { provide: PaginatorV2Service, useValue: mockPaginatorV2Service },
        { provide: ShadowService, useValue: mockShadowService },
      ],
      declarations: [HomeComponent, TextNeonDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('paginator() => to be defined', () => {
    expect(component.paginator).toBeDefined();
  });

  it('neon() => must return true', () => {
    expect(component.neon).toBeTruthy();
  });

  it('mySkills() => must be not undefined', () => {
    expect(component.mySkills).not.toBeUndefined();
  });

  it('aboutMe() => must be not undefined', () => {
    expect(component.aboutMe).not.toBeUndefined();
  });

  it('colorRed() => must return test color', () => {
    expect(component.colorRed).toEqual('test color');
  });

  it('colorRedNeon() => must return test color', () => {
    expect(component.colorRedNeon).toEqual('test color');
  });
});
