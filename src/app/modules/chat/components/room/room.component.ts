import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NeonService } from 'src/app/services/neon/neon.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [
    trigger('profile', [
      state(
        'hide',
        style({
          opacity: 0,
          scale: 0,
        })
      ),
      state(
        'show',
        style({
          opacity: 1,
          scale: 1,
        })
      ),
      transition('hide <=> show', [animate('0.1s')]),
    ]),
  ],
})
export class RoomComponent implements OnInit, OnDestroy {
  @ViewChild('messagesItems', { static: false })
  public messagesItems: ElementRef = {
    nativeElement: undefined,
  };

  private _currChat$!: Subscription;
  private _messages$!: Subscription;
  private _currChat: string | undefined = undefined;
  private _isHideProfile: boolean = true;
  readonly textAreaRows: number = 1;
  readonly messageLength = {
    min: 1,
    max: 200,
  };

  messageForm = new FormGroup({
    message: new FormControl(
      { value: '', disabled: this.currChat === undefined },
      [
        Validators.required,
        Validators.maxLength(this.messageLength.max),
        Validators.minLength(this.messageLength.min),
      ]
    ),
  });

  constructor(
    private _neonService: NeonService,
    private _profileService: ProfileService,
    private _authService: AuthService
  ) {
    this._currChat$ = this._profileService.currChat.subscribe((observer) => {
      this._currChat = observer;
      if (!!observer) {
        this._isHideProfile = true;
        this.messageControl.enable();
      } else {
        this.messageControl.disable();
      }
    });
    this._messages$ = this._profileService.messages.subscribe(() => {
      setTimeout(() => {
        const el = this.messagesItems?.nativeElement;
        if (el != undefined && el != null) {
          this.messagesItems.nativeElement.scrollTop =
            this.messagesItems.nativeElement.scrollHeight;
        }
      }, 100);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._currChat$.unsubscribe();
    this._messages$.unsubscribe();
  }

  get neonState(): boolean {
    return this._neonService.isEnable();
  }
  get messageControl() {
    return this.messageForm.controls.message as FormControl;
  }
  get chats(): string[] {
    return this._profileService.chats;
  }
  get userName(): string | undefined {
    return !!this._authService.userName ? this._authService.userName : 'user';
  }
  get isLoad(): boolean {
    return this._profileService.isLoadProfile;
  }
  get currChat(): string | undefined {
    return this._currChat;
  }
  get isHideProfile(): boolean {
    return this._isHideProfile;
  }

  toggleProfile() {
    this._isHideProfile = !this._isHideProfile;
  }

  setCurrChat(chat: string) {
    this._profileService.setCurrChat(chat);
  }

  outChat(chatName: string) {
    this._profileService.outChat(chatName);
  }

  signOut() {
    this._profileService.signOut();
    this._isHideProfile = true;
  }

  onSubmit() {
    let tempValue = this.messageControl.value.trim();
    if (this.messageForm.valid && tempValue.length > 0) {
      this.messageForm.reset();
      this._profileService.addMessage(tempValue as string);
    }
  }

  onKeyUp(event: any) {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.onSubmit();
    }
  }

  create() {
    this._profileService.isHideCreate(false);
  }

  join() {
    this._profileService.isHideJoin(false);
  }
}
