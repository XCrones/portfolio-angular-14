import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthService } from './auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let angularFireAuth: AngularFireAuth;

  const mockAngularFireAuth = {
    createUserWithEmailAndPassword(
      email: string,
      password: string
    ): Promise<firebase.auth.UserCredential> {
      return Promise.resolve({
        user: null,
        additionalUserInfo: null,
        operationType: undefined,
        credential: null,
      });
    },
    signInWithEmailAndPassword(email: string, password: string) {},
    get authState(): BehaviorSubject<firebase.User | null> {
      return new BehaviorSubject<firebase.User | null>(null);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    service = TestBed.inject(AuthService);
    angularFireAuth = TestBed.inject(AngularFireAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
