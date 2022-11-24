import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextNeonDirective } from 'src/app/modules/ui/text-neon/text-neon.directive';
import { IconNeonPipe } from 'src/app/pipes/iconNeon/icon-neon.pipe';
import { NeonService } from 'src/app/services/neon/neon.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let shadowService: ShadowService;

  const mockShadowService = jasmine.createSpyObj(['getTextNeon']);
  mockShadowService.getTextNeon.and.returnValue('');

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: NeonService, useValue: mockNeonService },
        { provide: ShadowService, useValue: mockShadowService },
      ],
      declarations: [HeaderComponent, TextNeonDirective, IconNeonPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    mockShadowService.getTextNeon.calls.reset();
    mockNeonService.isEnable.calls.reset();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isEnable(bool) => search btn and click, then must be call isEnable(!bool)', () => {
    const currStateNeon = component.neon;
    const btn = fixture.debugElement.query(By.css('button.btn-neon'));
    btn.nativeElement.click();
    expect(mockNeonService.isEnable).toHaveBeenCalledWith(!currStateNeon);
  });

  it('hamburger => search btn and click, then must be set !hamburger', () => {
    const currStateHam = component.hamburger;
    const btn = fixture.debugElement.query(By.css('button.btn-hambr'));
    btn.nativeElement.click();
    expect(component.hamburger).toBe(!currStateHam);
  });

  it('onResize(event) => HostListener must be call resizePaginator(width)', () => {
    const mock = spyOn(component, 'hideHamburger').and.callFake(
      (v: number) => {}
    );
    mock.calls.reset();
    const event = {
      target: {
        innerWidth: 767,
      },
    };
    component.onResize(event);
    expect(mock).toHaveBeenCalledWith(event.target.innerWidth);
  });
});
