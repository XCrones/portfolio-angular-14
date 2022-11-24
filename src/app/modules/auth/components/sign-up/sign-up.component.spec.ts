import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TextNeonDirective } from 'src/app/modules/ui/text-neon/text-neon.directive';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { ISignUp } from '../../interfaces/signup/i-sign-up';
import { AuthService } from '../../services/auth/auth.service';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;

  const testUid = 'test uid';

  const testEmail = 'test@mail.com';
  const testPassword = '123123';

  const testUser: ISignUp = {
    email: testEmail,
    password: testPassword,
  };

  const mockAuthService = jasmine.createSpyObj(['signUp']);
  const mockShadowService = jasmine.createSpyObj(['getTextNeon']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ShadowService, useValue: mockShadowService },
      ],
      declarations: [SignUpComponent, TextNeonDirective],
    }).compileComponents();

    authService = TestBed.inject(AuthService);

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;

    mockAuthService.signUp.calls.reset();
    mockShadowService.getTextNeon.calls.reset();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeProfile() => search btn and emit isCloseProfile', () => {
    const mockEmit = spyOn(component.isCloseProfile, 'emit');
    mockEmit.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-close'));
    btn.nativeElement.click();

    expect(mockEmit).toHaveBeenCalled();
  });

  it('toggleForm() => search btn and emit isCloseProfile', () => {
    const mockEmit = spyOn(component.isToggleForm, 'emit');
    mockEmit.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-toggle'));
    btn.nativeElement.click();

    expect(mockEmit).toHaveBeenCalled();
  });

  it('onSubmit() => search btn attr disabled must be true and valid form must be false', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-submit'));

    expect(btn.properties['disabled']).toBeTruthy();
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('onSubmit() => search btn attr disabled must be false and valid form must be true', () => {
    component.signUpForm.controls.email.setValue(testEmail);
    component.signUpForm.controls.password.setValue(testPassword);
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button.btn-submit'));

    expect(btn.properties['disabled']).toBeFalse();
    expect(component.signUpForm.valid).toBeTruthy();
  });

  it('onSubmit() => search btn and click, then emit load and call reset form', async () => {
    component.signUpForm.controls.email.setValue(testEmail);
    component.signUpForm.controls.password.setValue(testPassword);

    fixture.detectChanges();

    const mockForm = spyOn(component.signUpForm.controls.password, 'reset');
    mockForm.calls.reset();

    const mockEmitLoad = spyOn(component.load, 'emit');
    mockEmitLoad.calls.reset();

    const mockEmitIsUserSignIn = spyOn(component.isUserSignIn, 'emit');
    mockEmitIsUserSignIn.calls.reset();

    mockAuthService.signUp.and.returnValue(Promise.resolve(testUid));

    const btn = fixture.debugElement.query(By.css('button.btn-submit'));
    await btn.nativeElement.click();

    expect(mockEmitLoad).toHaveBeenCalled();
    expect(mockEmitIsUserSignIn).toHaveBeenCalledWith(testUid);
    expect(mockForm).toHaveBeenCalled();
  });

  it('onSubmit() => must be called toHaveBeenCalled() and response eqaul error and call reset form', (done) => {
    component.signUpForm.controls.email.setValue(testEmail);
    component.signUpForm.controls.password.setValue(testPassword);

    fixture.detectChanges();

    const mockForm = spyOn(component.signUpForm.controls.password, 'reset');
    mockForm.calls.reset();

    const mockEmitLoad = spyOn(component.load, 'emit');
    mockEmitLoad.calls.reset();

    const mockEmitIsUserSignIn = spyOn(component.isUserSignIn, 'emit');
    mockEmitIsUserSignIn.calls.reset();

    mockAuthService.signUp.and.returnValue(Promise.reject('error'));

    component
      .onSubmit()
      .then()
      .then(() => {
        expect(component.response).toEqual('error');
        expect(mockForm).toHaveBeenCalled();
        done();
      });
  });
});
