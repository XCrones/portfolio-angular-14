import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NeonService } from 'src/app/services/neon/neon.service';

import { Page404Component } from './page404.component';

describe('Page404Component', () => {
  let component: Page404Component;
  let fixture: ComponentFixture<Page404Component>;
  let neonService: NeonService;

  const mockNeonService = jasmine.createSpyObj(['isEnable']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: NeonService, useValue: mockNeonService }],
      declarations: [Page404Component],
    }).compileComponents();

    neonService = TestBed.inject(NeonService);

    fixture = TestBed.createComponent(Page404Component);
    component = fixture.componentInstance;

    mockNeonService.isEnable.calls.reset();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if isEnable neon classed must be includes (text-neon-flicker) or else must not contain (text-neon-flicker)', () => {
    mockNeonService.isEnable.and.returnValue(true);
    fixture.detectChanges();

    let divCode = fixture.debugElement.query(By.css('.text-code'));
    expect(divCode.classes['text-neon-flicker']).toBeTruthy();

    let divTitle = fixture.debugElement.query(By.css('.text-title'));
    expect(divTitle.classes['text-neon-flicker']).toBeTruthy();

    mockNeonService.isEnable.and.returnValue(false);
    fixture.detectChanges();

    divCode = fixture.debugElement.query(By.css('.text-code'));
    expect(divCode.classes['text-neon-flicker']).toBeFalsy();

    divTitle = fixture.debugElement.query(By.css('.text-title'));
    expect(divTitle.classes['text-neon-flicker']).toBeFalsy();
  });
});
