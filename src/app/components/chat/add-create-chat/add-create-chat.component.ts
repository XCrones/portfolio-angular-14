import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NeonService } from 'src/app/services/neon/neon.service';

@Component({
  selector: 'app-add-create-chat',
  templateUrl: './add-create-chat.component.html',
  styleUrls: ['./add-create-chat.component.scss'],
})
export class AddCreateChatComponent implements OnInit, OnChanges {
  @Input() responseErr: string = '';
  @Input() isLoad: boolean = false;
  @Input() isResetForm: boolean = false;
  @Output() nameChat: EventEmitter<string> = new EventEmitter();
  @Output() isCancel: EventEmitter<void> = new EventEmitter();
  @Output() isCretaeChat: EventEmitter<string> = new EventEmitter();
  @Output() isJoinChat: EventEmitter<string> = new EventEmitter();

  private _isResetForm: boolean = false;
  readonly nameLength = {
    min: 1,
    max: 20,
  };

  constructor(private _neonService: NeonService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    let hasResetKey = Object.prototype.hasOwnProperty.call(
      changes,
      'isResetForm'
    );

    if (hasResetKey) {
      if (changes['isResetForm'].currentValue != this._isResetForm) {
        this._isResetForm = changes['isResetForm'].currentValue;
        this.nameForm.reset();
      }
    }
  }

  nameForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(this.nameLength.min),
      Validators.maxLength(this.nameLength.max),
    ]),
  });

  get nameControl(): FormControl {
    return this.nameForm.controls.name as FormControl;
  }
  get neonState(): boolean {
    return this._neonService.isEnable();
  }
  get isJoin(): boolean {
    return this.responseErr.includes('занято');
  }
  get isCreate(): boolean {
    return this.responseErr.includes('не существует');
  }

  cancel() {
    this.isCancel.emit();
  }

  getValue(): string | undefined {
    if (this.nameForm.valid) {
      return this.nameControl.value.toLowerCase().trim();
    }
    return undefined;
  }

  onSubmit() {
    let result = this.getValue();
    if (!!result) {
      this.nameChat.emit(result);
    }
  }

  createChat() {
    let result = this.getValue();
    if (!!result) {
      this.isCretaeChat.emit(result);
    }
  }

  joinChat() {
    let result = this.getValue();
    if (!!result) {
      this.isJoinChat.emit(result);
    }
  }
}
