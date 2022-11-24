import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const testPattern = '©&nbsp;2022&nbsp;anydea';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('div innterHTML must be equal testPattern', () => {
    const div = fixture.debugElement.query(By.css('div'));
    expect(String(div.nativeElement.innerHTML).trim().toLowerCase()).toEqual(
      testPattern
    );
  });
});
