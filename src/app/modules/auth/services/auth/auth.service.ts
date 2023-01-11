import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

export interface ISignUp {
  email: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IErrors {
  error: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly errCode: Array<IErrors> = [
    {
      error: 'auth/email-already-in-use',
      title: 'пользователь с таким email уже имется',
    },
    {
      error: 'auth/user-not-found',
      title: 'нет такого пользователя',
    },
    {
      error: 'auth/wrong-password',
      title: 'неправильный email или пароль',
    },
    {
      error: 'auth/too-many-requests',
      title: 'слишком много попыток, повторите позже',
    },
  ];

  private _userData!: any;

  constructor(private agnularFireAuth: AngularFireAuth) {
    this.agnularFireAuth.authState.subscribe((user) => {
      if (user) {
        this._userData = user;
        localStorage.setItem('user', JSON.stringify(this._userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get isAuth(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return !!user ? true : false;
  }
  private get userData(): firebase.User {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }
  get userName(): string | undefined {
    return !!this.userData?.email
      ? this.userData.email.split('@')[0]
      : undefined;
  }
  get uid(): string | undefined {
    return !!this.userData?.uid ? this.userData.uid : undefined;
  }

  signUp(user: ISignUp): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.agnularFireAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          resolve(String(res.user?.uid));
        })
        .catch((err) => {
          reject(this.searchError(err.code));
        });
    });
  }

  signIn(user: ISignIn): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.agnularFireAuth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          resolve(String(res.user?.uid));
        })
        .catch((err) => {
          reject(this.searchError(err.code));
        });
    });
  }

  private searchError(errCode: string): string {
    let findErr = this.errCode.find(
      (v) => v.error.toLowerCase().trim() === errCode.toLowerCase().trim()
    );
    if (!!findErr) {
      return findErr.title;
    } else {
      return errCode;
    }
  }

  signOut() {
    this.agnularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }
}
