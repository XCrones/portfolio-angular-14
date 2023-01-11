import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { IMessagesItem } from '../../interfaces/messages/i-messages-item';
import { FirestoreService } from '../firestore/firestore.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let authService: AuthService;
  let firestoreService: FirestoreService;

  const testUid = 'test uid';
  const testChatName = 'test chat name';
  const testUserName = 'test user name';
  const testData = 'test date';
  const testMessage = 'test message';
  const testItemMessage: IMessagesItem = {
    date: testData,
    message: testData,
    name: testUserName,
    uid: testUid,
  };

  const mockAuthService = {
    get isAuth(): boolean {
      return false;
    },
    get uid(): string {
      return testUid;
    },
    get userName(): string {
      return testUserName;
    },
    signOut() {},
  };

  const mockFirestoreService = jasmine.createSpyObj([
    'getProfile',
    'getMessages',
    'createChat',
    'joinChat',
    'addUserToChat',
    'outChatUser',
    'pushMessage',
    'removeMessage',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: FirestoreService, useValue: mockFirestoreService },
      ],
    });
    service = TestBed.inject(ProfileService);
    authService = TestBed.inject(AuthService);
    firestoreService = TestBed.inject(FirestoreService);

    mockFirestoreService.getProfile.and.returnValue(
      new BehaviorSubject<any>({ chats: [testChatName] })
    );

    mockFirestoreService.getMessages.and.returnValue(
      new BehaviorSubject<any>({
        messages: [testItemMessage],
      })
    );

    mockFirestoreService.getProfile.calls.reset();
    mockFirestoreService.getMessages.calls.reset();
    mockFirestoreService.pushMessage.calls.reset();
    mockFirestoreService.removeMessage.calls.reset();
    mockFirestoreService.createChat.calls.reset();
    mockFirestoreService.joinChat.calls.reset();
    mockFirestoreService.addUserToChat.calls.reset();
    mockFirestoreService.outChatUser.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isHideCreate() => should be default is true, isHideCreate(true|false) return true|false', () => {
    expect(service.isHideCreate()).toBeTruthy();
    expect(service.isHideCreate(false)).toBeFalsy();
    expect(service.isHideCreate(true)).toBeTruthy();
  });

  it('isHideJoin() => should be default is true, isHideJoin(true|false) return true|false', () => {
    expect(service.isHideJoin()).toBeTruthy();
    expect(service.isHideJoin(false)).toBeFalsy();
    expect(service.isHideJoin(true)).toBeTruthy();
  });

  it(`tryProfile() => should be mock get profile. must be call getProfile(testUid) , 
    then setCurrChat(test chat name). must be call getMessages(test chat name)`, () => {
    spyOnProperty(authService, 'isAuth', 'get').and.returnValue(true);

    expect(service.isLoadProfile).toBeFalsy();
    service.tryProfile();
    expect(service.chats[0]).toEqual(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getProfile).toHaveBeenCalledWith(testUid);
    expect(mockFirestoreService.getProfile).toHaveBeenCalledTimes(1);
    expect(service.isLoadProfile).toBeFalsy();
    service.setCurrChat(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getMessages).toHaveBeenCalledWith(testChatName);
    expect(mockFirestoreService.getMessages).toHaveBeenCalledTimes(1);
  });

  it(`tryProfile(testUid) => should be mock get profile. must be call getProfile(testUid) , 
    then setCurrChat(test chat name). must be call getMessages(test chat name). 
    finally signOut() and chats length === 0`, async () => {
    spyOn(authService, 'signOut').and.callFake(() => {});
    spyOnProperty(authService, 'isAuth', 'get').and.returnValue(true);

    expect(service.isLoadProfile).toBeFalsy();

    service.tryProfile(testUid);
    expect(service.chats[0]).toEqual(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getProfile).toHaveBeenCalledWith(testUid);
    expect(mockFirestoreService.getProfile).toHaveBeenCalledTimes(1);
    expect(service.isLoadProfile).toBeFalsy();

    service.setCurrChat(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getMessages).toHaveBeenCalledWith(testChatName);
    expect(mockFirestoreService.getMessages).toHaveBeenCalledTimes(1);

    service.signOut();
    expect(mockAuthService.signOut).toHaveBeenCalled();
    expect(mockAuthService.signOut).toHaveBeenCalledTimes(1);
    expect(service.chats.length).toBe(0);
  });

  it(`tryProfile(testUid) => should be mock get profile. must be call getProfile(testUid) , 
    then setCurrChat(test chat name). must be call getMessages(test chat name). 
    finally addMessage() then called pushMessage() times(1)`, () => {
    spyOnProperty(authService, 'isAuth', 'get').and.returnValue(true);

    expect(service.isLoadProfile).toBeFalsy();
    service.tryProfile(testUid);
    expect(service.chats[0]).toEqual(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getProfile).toHaveBeenCalledWith(testUid);
    expect(mockFirestoreService.getProfile).toHaveBeenCalledTimes(1);
    expect(service.isLoadProfile).toBeFalsy();
    service.setCurrChat(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getMessages).toHaveBeenCalledWith(testChatName);
    expect(mockFirestoreService.getMessages).toHaveBeenCalledTimes(1);
    service.addMessage(testMessage);
    expect(mockFirestoreService.pushMessage).toHaveBeenCalled();
    expect(mockFirestoreService.pushMessage).toHaveBeenCalledTimes(1);
  });

  it(`tryProfile(testUid) => should be mock get profile. must be call getProfile(testUid) , 
  then setCurrChat(test chat name). must be call getMessages(test chat name). 
  finally deleteMessage() then called removeMessage() times(1)`, () => {
    spyOnProperty(authService, 'isAuth', 'get').and.returnValue(true);

    expect(service.isLoadProfile).toBeFalsy();
    service.tryProfile(testUid);
    expect(service.chats[0]).toEqual(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getProfile).toHaveBeenCalledWith(testUid);
    expect(mockFirestoreService.getProfile).toHaveBeenCalledTimes(1);
    expect(service.isLoadProfile).toBeFalsy();
    service.setCurrChat(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getMessages).toHaveBeenCalledWith(testChatName);
    expect(mockFirestoreService.getMessages).toHaveBeenCalledTimes(1);
    service.deleteMessage(testItemMessage);
    expect(mockFirestoreService.removeMessage).toHaveBeenCalled();
    expect(mockFirestoreService.removeMessage).toHaveBeenCalledTimes(1);
  });

  it(`tryProfile(testUid) => should be mock get profile. must be call getProfile(testUid) , 
  then setCurrChat(test chat name). must be call getMessages(test chat name). 
  finally deleteMessage() then called removeMessage() times(1)`, () => {
    spyOnProperty(authService, 'isAuth', 'get').and.returnValue(true);

    expect(service.isLoadProfile).toBeFalsy();
    service.tryProfile(testUid);
    expect(service.chats[0]).toEqual(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getProfile).toHaveBeenCalledWith(testUid);
    expect(mockFirestoreService.getProfile).toHaveBeenCalledTimes(1);
    expect(service.isLoadProfile).toBeFalsy();
    service.setCurrChat(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getMessages).toHaveBeenCalledWith(testChatName);
    expect(mockFirestoreService.getMessages).toHaveBeenCalledTimes(1);
    service.outChat(testChatName);
    expect(mockFirestoreService.outChatUser).toHaveBeenCalledWith(
      testUid,
      testChatName
    );
    expect(mockFirestoreService.outChatUser).toHaveBeenCalledTimes(1);
  });

  it(`tryProfile(testUid) => should be mock get profile. must be call getProfile(testUid) , 
    then setCurrChat(test chat name). must be call getMessages(test chat name). 
    finally signOut() and chats length === 0`, () => {
    spyOn(authService, 'signOut').and.callFake(() => {});
    spyOnProperty(authService, 'isAuth', 'get').and.returnValue(true);

    expect(service.isLoadProfile).toBeFalsy();
    service.tryProfile(testUid);
    expect(service.chats[0]).toEqual(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getProfile).toHaveBeenCalledWith(testUid);
    expect(mockFirestoreService.getProfile).toHaveBeenCalledTimes(1);
    expect(service.isLoadProfile).toBeFalsy();
    service.setCurrChat(testChatName);
    expect(service.isLoadProfile).toBeFalsy();
    expect(mockFirestoreService.getMessages).toHaveBeenCalledWith(testChatName);
    expect(mockFirestoreService.getMessages).toHaveBeenCalledTimes(1);
    service.setCurrChat(testChatName);
  });
});
