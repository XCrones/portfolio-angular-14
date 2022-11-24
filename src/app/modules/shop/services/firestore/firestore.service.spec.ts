import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { FIELDS_DB, fieldsDb } from '../../fieldsDb';

import { FirestoreService } from './firestore.service';

describe('FirestoreService', () => {
  let service: FirestoreService;
  let angularFirestore: AngularFirestore;
  const mockAngularFirestore = jasmine.createSpyObj(['collection']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: mockAngularFirestore },
        { provide: FIELDS_DB, useValue: fieldsDb },
      ],
    });
    service = TestBed.inject(FirestoreService);
    angularFirestore = TestBed.inject(AngularFirestore);
    TestBed.inject(FIELDS_DB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
