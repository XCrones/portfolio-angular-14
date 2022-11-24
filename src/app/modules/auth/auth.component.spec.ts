import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoxNeonDirective } from '../ui/box-neon/box-neon.directive';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent, BoxNeonDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('closeProfile() => must call event closeWindow(void)', () => {
    const event = spyOn(component.closeWindow, 'emit');
    component.closeProfile();
    expect(event).toHaveBeenCalled();
  });

  it('userSingIn(string) => must be call event isUserSignIn(string)', () => {
    const testuid = 'test uid';
    const event = spyOn(component.isUserSignIn, 'emit');
    component.userSingIn(testuid);
    expect(event).toHaveBeenCalledWith(testuid);
  });

  it('isLoad => set isload(true) => isLoad must be true then div.auth-load dont be null', () => {
    component.getIsLoad(true);
    expect(component.getIsLoad).toBeTruthy();
    fixture.detectChanges();
    const divLoad = fixture.debugElement.query(By.css('div.auth-load'));
    expect(divLoad).not.toBeNull();
  });

  it('directive appBoxNeon => color & shadow', () => {
    const childsBoxShadows = [
      'rgb(255, 0, 0)',
      'rgb(0, 128, 0)',
      'rgb(0, 0, 255)',
    ];

    component.getIsLoad(true);
    expect(component.getIsLoad).toBeTruthy();
    fixture.detectChanges();

    const divLoad = fixture.debugElement.query(By.css('div.auth-load'));
    expect(divLoad).not.toBeNull();

    expect(component.neonState).toBeTruthy();
    const arrChildres = divLoad.children[0].children;
    expect(arrChildres.length).toBe(3);
    arrChildres.map((el, idx) => {
      expect(el.styles['boxShadow']).toContain(childsBoxShadows[idx]);
    });
  });

  it('toggleForm() => if true #signIn - not null, #signUp - null. if false #signIn - null, #signUp - not null', () => {
    let divSignIn = fixture.debugElement.query(By.css('#signIn'));
    let divSignUp = fixture.debugElement.query(By.css('#signUp'));
    expect(divSignIn).not.toBeNull();
    expect(divSignUp).toBeNull();

    component.toggleForm();
    fixture.detectChanges();

    divSignIn = fixture.debugElement.query(By.css('#signIn'));
    divSignUp = fixture.debugElement.query(By.css('#signUp'));
    expect(divSignIn).toBeNull();
    expect(divSignUp).not.toBeNull();
  });
});
