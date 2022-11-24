import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISignIn } from '../../interfaces/signIn/i-sign-in';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  private _response: string = '';
  @Input() neonState: boolean = false;
  @Output() isToggleForm: EventEmitter<void> = new EventEmitter();
  @Output() isCloseProfile: EventEmitter<void> = new EventEmitter();
  @Output() isUserSignIn: EventEmitter<string> = new EventEmitter();
  @Output() load: EventEmitter<boolean> = new EventEmitter(false);

  readonly length = {
    max: 10,
    min: 4,
  };

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.length.min),
      Validators.maxLength(this.length.max),
    ]),
  });

  constructor(private _authService: AuthService) {}

  get emailControl() {
    return this.signInForm.controls.email as FormControl;
  }
  get passwordControl() {
    return this.signInForm.controls.password as FormControl;
  }
  get isDisableSubmit(): boolean {
    return this.signInForm.status.toLocaleLowerCase().trim() === 'invalid'
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
    if (this.signInForm.valid) {
      this.load.emit(true);
      const user: ISignIn = {
        email: this.emailControl.value as string,
        password: this.passwordControl.value as string,
      };
      this._authService
        .signIn(user)
        .then((uid) => {
          this.signInForm.reset();
          if (uid != undefined && uid != null) {
            this.isUserSignIn.emit(uid);
          }
        })
        .catch((err) => {
          this._response = err;
          this.signInForm.controls.password.reset();
        })
        .finally(() => this.load.emit(false));
    }
  }
}
