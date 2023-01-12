import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import firebase from 'firebase/compat/app';
import { IMessagesItem } from '../profile/profile.service';

const COLLECTION_USERS = 'chat-users';
const COLLECTION_CHATS = 'chats';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private readonly fs: AngularFirestore) {}

  getProfile(uid: string): Observable<any> {
    return this.fs.collection(COLLECTION_USERS).doc(uid).valueChanges();
  }

  getMessages(chatName: string): Observable<any> {
    return this.fs.collection(COLLECTION_CHATS).doc(chatName).valueChanges();
  }

  async createChat(chatName: string) {
    const db = this.fs.collection(COLLECTION_CHATS).doc(chatName);
    const firstValue = await firstValueFrom(db.valueChanges());

    if (!!!firstValue) {
      await db.set({
        messages: [],
      });
      return true;
    } else {
      return false;
    }
  }

  async joinChat(chatName: string) {
    const db = this.fs
      .collection(COLLECTION_CHATS)
      .doc(chatName)
      .valueChanges();
    const firstValue = await firstValueFrom(db);
    if (!!firstValue) {
      return true;
    } else {
      return false;
    }
  }

  async addUserToChat(uid: string, chatName: string) {
    const db = this.fs.collection(COLLECTION_USERS).doc(uid);

    try {
      await db.update({
        chats: firebase.firestore.FieldValue.arrayUnion(chatName),
      });
    } catch (e) {
      db.set({
        chats: [chatName],
      });
    }
  }

  async outChatUser(uid: string, chatName: string) {
    const db = this.fs.collection(COLLECTION_USERS).doc(uid);
    await db.update({
      chats: firebase.firestore.FieldValue.arrayRemove(chatName),
    });
  }

  async pushMessage(chatName: string, message: IMessagesItem) {
    const db = this.fs.collection(COLLECTION_CHATS).doc(chatName);
    try {
      await db.update({
        messages: firebase.firestore.FieldValue.arrayUnion(message),
      });
    } catch (e) {
      const newField: IMessagesItem[] = [message];
      await db.set({
        messages: newField,
      });
    }
  }

  async removeMessage(chatName: string, message: IMessagesItem) {
    const db = this.fs.collection(COLLECTION_CHATS).doc(chatName);
    await db.update({
      messages: firebase.firestore.FieldValue.arrayRemove(message),
    });
  }
}
