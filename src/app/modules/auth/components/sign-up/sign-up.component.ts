import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, ISignUp } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Input() neonState: boolean = false;
  @Output() isToggleForm: EventEmitter<void> = new EventEmitter();
  @Output() isCloseProfile: EventEmitter<void> = new EventEmitter();
  @Output() isUserSignIn: EventEmitter<string> = new EventEmitter();
  @Output() load: EventEmitter<boolean> = new EventEmitter(false);

  constructor(private _authService: AuthService) {}

  private _response: string = '';
  readonly length = {
    max: 10,
    min: 4,
  };

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.length.min),
      Validators.maxLength(this.length.max),
    ]),
  });

  get emailControl() {
    return this.signUpForm.controls.email as FormControl;
  }
  get passwordControl() {
    return this.signUpForm.controls.password as FormControl;
  }
  get isDisableSubmit(): boolean {
    return this.signUpForm.status.toLocaleLowerCase().trim() === 'invalid'
      ? true
      : false;
  }
  get response(): string {
    return this._response;
  }

  ngOnInit(): void {}

  toggleForm() {
    this.isToggleForm.emit();
  }

  closeProfile() {
    this.isCloseProfile.emit();
  }

  onBlur() {
    this._response = '';
  }
  onFocus() {
    this._response = '';
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      this.load.emit(true);
      const user: ISignUp = {
        email: this.emailControl.value as string,
        password: this.passwordControl.value as string,
      };
      this._authService
        .signUp(user)
        .then((uid) => {
          this.signUpForm.reset();
          if (uid != undefined && uid != null) {
            this.isUserSignIn.emit(uid);
          }
        })
        .catch((err) => {
          this._response = err;
          this.signUpForm.controls.password.reset();
        })
        .finally(() => this.load.emit(false));
    }
  }
}
