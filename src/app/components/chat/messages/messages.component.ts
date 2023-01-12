import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import {
  IMessagesItem,
  ProfileService,
} from 'src/app/pages/chat/services/profile/profile.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  private _currChat: string | undefined = undefined;
  private _messages: IMessagesItem[] = [];
  private _currChat$!: Subscription;
  private _messages$!: Subscription;

  constructor(
    private _profileService: ProfileService,
    private _authService: AuthService
  ) {
    this._currChat$ = this._profileService.currChat.subscribe((observer) => {
      this._currChat = observer;
    });
    this._messages$ = this._profileService.messages.subscribe((observer) => {
      this._messages = observer;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._currChat$.unsubscribe();
    this._messages$.unsubscribe();
  }

  get messages(): IMessagesItem[] {
    return this._messages;
  }
  get uid(): string | undefined {
    return this._authService.uid;
  }
  get currChat(): string | undefined {
    return this._currChat;
  }

  deleteMessage(message: IMessagesItem) {
    this._profileService.deleteMessage(message);
  }
}
