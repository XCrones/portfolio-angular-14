import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NeonService } from 'src/app/services/neon/neon.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @Output() isUserSignIn: EventEmitter<string> = new EventEmitter();
  @Output() closeWindow: EventEmitter<void> = new EventEmitter();

  private _toggleForm: boolean = true;
  private _isLoad: boolean = false;

  constructor(private _neonService: NeonService) {}

  ngOnInit(): void {}

  get neonState(): boolean {
    return this._neonService.isEnable();
  }
  get isToggleForm(): boolean {
    return this._toggleForm;
  }
  get isLoad(): boolean {
    return this._isLoad;
  }

  toggleForm() {
    this._toggleForm = !this._toggleForm;
  }

  closeProfile() {
    this.closeWindow.emit();
  }

  userSingIn(uid: string) {
    this.isUserSignIn.emit(uid);
  }

  getIsLoad(state: boolean) {
    this._isLoad = state;
  }
}
