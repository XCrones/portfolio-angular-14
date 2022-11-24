import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { TextNeonDirective } from 'src/app/modules/ui/text-neon/text-neon.directive';
import { NeonService } from 'src/app/services/neon/neon.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { IMessagesItem } from '../../interfaces/messages/i-messages-item';
import { ProfileService } from '../../services/profile/profile.service';

import { RoomComponent } from './room.component';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let neonService: NeonService;
  let profileService: ProfileService;
  let authService: AuthService;
  let shadowService: ShadowService;

  const mockShadowService = jasmine.createSpyObj(['getTextNeon']);
  mockShadowService.getTextNeon.and.returnValue('');

  const testUserName = 'test userName';
  const mockAuthService = {
    get userName(): string | undefined {
      return testUserName;
    },
  };

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  const testChat1 = 'test chat 1';
  const testChat2 = 'test chat 2';
  const testChat3 = 'test chat 3';

  const mockProfileService = {
    get currChat(): BehaviorSubject<string | undefined> {
      return new BehaviorSubject<string | undefined>(testCurrChat || undefined);
    },
    get messages(): BehaviorSubject<IMessagesItem[]> {
      return new BehaviorSubject<IMessagesItem[]>([]);
    },
    deleteMessage(message: IMessagesItem) {},
    get chats(): string[] {
      return [testChat1, testChat2, testChat3];
    },
    get isLoadProfile(): boolean {
      return false;
    },
    setCurrChat(currChat: string) {},
    outChat(chatName: string) {},
    signOut(chatName: string) {},
    addMessage(message: string) {},
    isHideCreate(state: boolean) {},
    isHideJoin(state: boolean) {},
  };

  const testCurrChat = 'test curr chat';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: NeonService, useValue: mockNeonService },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: AuthService, useValue: mockAuthService },
      ],
      declarations: [RoomComponent, TextNeonDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    neonService = TestBed.inject(NeonService);
    profileService = TestBed.inject(ProfileService);
    authService = TestBed.inject(AuthService);
    shadowService = TestBed.inject(ShadowService);

    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockShadowService.getTextNeon.calls.reset();
    mockNeonService.isEnable.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addMessage(string) => search btns[0] and click, then must be called with(string)', () => {
    const mockProfileService = spyOn(profileService, 'addMessage').and.callFake(
      (message: string) => {}
    );
    mockProfileService.calls.reset();

    const mockForm = spyOn(component.messageForm, 'reset').and.callFake(
      () => {}
    );
    mockForm.calls.reset();

    const btn = fixture.debugElement.query(By.css('button.btn-submit'));

    component.messageControl.setValue('test message');

    btn.nativeElement.click();
    expect(mockProfileService).toHaveBeenCalledWith('test message');
    expect(mockProfileService).toHaveBeenCalledTimes(1);
    expect(mockForm).toHaveBeenCalled();
    expect(mockForm).toHaveBeenCalledTimes(1);
  });

  it('isHideCreate(false) => search btn and click, then must be called with(false)', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-create'));
    const mockProfileService = spyOn(
      profileService,
      'isHideCreate'
    ).and.callFake((state: boolean) => {
      return state;
    });
    mockProfileService.calls.reset();

    btn.nativeElement.click();
    expect(mockProfileService).toHaveBeenCalledWith(false);
    expect(mockProfileService).toHaveBeenCalledTimes(1);
  });

  it('isHideJoin(true) => search btn and click, then must be called with(true)', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-join'));
    const mockProfileService = spyOn(profileService, 'isHideJoin').and.callFake(
      (state: boolean) => {
        return state;
      }
    );
    mockProfileService.calls.reset();

    btn.nativeElement.click();
    expect(mockProfileService).toHaveBeenCalledWith(false);
    expect(mockProfileService).toHaveBeenCalledTimes(1);
  });

  it('isHideProfile() => must be return true, then after call toggleProfile() must be return false', () => {
    expect(component.isHideProfile).toBeTruthy();
    component.toggleProfile();
    expect(component.isHideProfile).toBeFalse();
  });

  it('outChat(string) => search btn and click, then must be called with(string)', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-out-chat'));
    const mockProfileService = spyOn(profileService, 'outChat').and.callFake(
      (chat: string) => {}
    );
    mockProfileService.calls.reset();
    btn.nativeElement.click();
    expect(mockProfileService).toHaveBeenCalledWith(testChat1);
    expect(mockProfileService).toHaveBeenCalledTimes(1);
  });

  it('outChat(string) => search btn and click, then must be called with(string)', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-join-chat'));
    const mockProfileService = spyOn(
      profileService,
      'setCurrChat'
    ).and.callFake((chat: string) => {});
    mockProfileService.calls.reset();
    btn.nativeElement.click();
    expect(mockProfileService).toHaveBeenCalledWith(testChat1);
    expect(mockProfileService).toHaveBeenCalledTimes(1);
  });

  it('signOut() => search btn and click, then must be called and isHideProfile() must called and return true', () => {
    const btn = fixture.debugElement.query(By.css('button.btn-signout'));
    const mockProfileService = spyOn(profileService, 'signOut').and.callFake(
      () => {}
    );
    mockProfileService.calls.reset();

    btn.nativeElement.click();
    expect(mockProfileService).toHaveBeenCalledTimes(1);
    expect(component.isHideProfile).toBeTruthy();
  });
});
