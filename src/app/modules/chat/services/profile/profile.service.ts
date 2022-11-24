import { Injectable } from '@angular/core';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { IMessagesItem } from '../../interfaces/messages/i-messages-item';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _profile$!: Subscription;
  private _chats$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  private _messagesRef$!: Subscription;
  private _messages$: BehaviorSubject<IMessagesItem[]> = new BehaviorSubject<
    IMessagesItem[]
  >([]);

  private _currChat$: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);

  private _isLoadProfile: boolean = false;
  private _isHideCreate: boolean = true;
  private _isHideJoin: boolean = true;

  constructor(
    private _authService: AuthService,
    private _fireStoreService: FirestoreService
  ) {
    this.tryProfile();
  }

  get messages(): Subject<IMessagesItem[]> {
    return this._messages$;
  }
  get chats(): string[] {
    return this._chats$.value;
  }
  get isLoadProfile(): boolean {
    return this._isLoadProfile;
  }
  get currChat(): Subject<string | undefined> {
    return this._currChat$;
  }

  isHideCreate(isHide?: boolean): boolean {
    return (this._isHideCreate =
      isHide != undefined ? isHide : this._isHideCreate);
  }

  isHideJoin(isHide?: boolean): boolean {
    return (this._isHideJoin = isHide != undefined ? isHide : this._isHideJoin);
  }

  tryProfile(uid?: string) {
    if (!!uid) {
      this.subscribeProfile(uid);
    } else if (this._authService.isAuth) {
      const uid = this._authService.uid;
      if (!!uid) {
        this.subscribeProfile(uid);
      }
    }
  }

  private subscribeProfile(uid: string) {
    this._isLoadProfile = true;
    try {
      this._profile$ = this._fireStoreService
        .getProfile(uid)
        .subscribe((sub) => {
          this._isLoadProfile = false;
          const chats = sub?.chats;
          if (!!chats) {
            this._chats$.next(chats);
          }
        });
    } catch (e) {
      this._isLoadProfile = false;
    }
  }

  signOut() {
    try {
      this._profile$.unsubscribe();
      this._authService.signOut();
      this.clearMessages();
      this._chats$.value.length = 0;
      this._currChat$.next(undefined);
    } catch (e) {
      this.clearMessages();
      this._chats$.value.length = 0;
    }
  }

  private clearMessages() {
    try {
      this._messagesRef$.unsubscribe();
    } catch (e) {}
    this._messages$.value.length = 0;
  }

  setCurrChat(chat: string) {
    let tempChat = chat.toLowerCase().trim();
    if (!!tempChat && tempChat.length > 0) {
      if (tempChat === this._currChat$.value) {
        this._currChat$.next(undefined);
        this.clearMessages();
      } else {
        if (this._chats$.value.includes(tempChat)) {
          this._currChat$.next(tempChat);
          this.getChat(tempChat);
        }
      }
    }
  }

  private getChat(chatName: string) {
    this._isLoadProfile = true;
    try {
      this._messagesRef$ = this._fireStoreService
        .getMessages(chatName)
        .subscribe((observer) => {
          const messages: IMessagesItem[] = observer?.messages;
          if (!!messages) {
            this._messages$.next(messages);
          }
          this._isLoadProfile = false;
        });
    } catch (e) {
      this._isLoadProfile = false;
      throw new Error('err save chat');
    }
  }

  addMessage(message: string) {
    try {
      const uid = this._authService.uid;
      const userName = this._authService.userName;

      if (this._authService.isAuth && !!uid && !!userName) {
        let date =
          new Date().toISOString().split('T')[0] +
          'T' +
          new Date().toLocaleString().split(',')[1].trim() +
          ':' +
          new Date().getMilliseconds();
        const itemMessage: IMessagesItem = {
          uid: uid,
          name: userName,
          message: message,
          date: date,
        };
        if (!!this._currChat$.value) {
          this._fireStoreService.pushMessage(
            this._currChat$.value,
            itemMessage
          );
        }
      }
    } catch (e) {
      throw new Error('cant find user or err push');
    }
  }

  deleteMessage(message: IMessagesItem) {
    try {
      if (!!this._currChat$.value) {
        this._fireStoreService.removeMessage(this._currChat$.value, message);
      }
    } catch (e) {
      throw new Error('err delete message');
    }
  }

  async createChat(chatName: string) {
    const result = await this._fireStoreService.createChat(chatName);

    if (result) {
      await this.addUserToChat(chatName);
      this.isHideCreate(true);
      return true;
    } else {
      return false;
    }
  }

  async joinChat(chatName: string) {
    const result = await this._fireStoreService.joinChat(chatName);
    if (result) {
      await this.addUserToChat(chatName);
      this.isHideJoin(true);
      return true;
    } else {
      return false;
    }
  }

  private async addUserToChat(chatName: string) {
    const uid = this._authService.uid;
    if (!!uid) {
      await this._fireStoreService.addUserToChat(uid, chatName);
      this.clearMessages();
      this.setCurrChat(chatName);
    }
  }

  outChat(chatName: string) {
    const uid = this._authService.uid;
    if (!!uid) {
      this._fireStoreService.outChatUser(uid, chatName);
    }
  }
}
