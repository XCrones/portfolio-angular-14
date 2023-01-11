import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { IMessagesItem } from '../../interfaces/messages/i-messages-item';
import { TimePipe } from '../../pipes/time/time.pipe';
import { ProfileService } from '../../services/profile/profile.service';

import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let profileService: ProfileService;
  let authService: AuthService;

  const testParseTime1 = '08:12';
  const testParseTime2 = '08:42';

  const testUid1 = 'test uid 1';
  const testUid2 = 'test uid 2';

  const testMessages1: IMessagesItem = {
    uid: testUid1,
    name: 'test user 1',
    message: 'test messages 1',
    date: `2022-11-02T${testParseTime1}:324`,
  };

  const testMessages2: IMessagesItem = {
    uid: testUid2,
    name: 'test user 2',
    message: 'test messages 2',
    date: `2022-11-02T${testParseTime2}:324`,
  };

  const testCurrChat = 'test curr chat';

  const mockProfileService = {
    get currChat(): BehaviorSubject<string | undefined> {
      return new BehaviorSubject<string | undefined>(testCurrChat || undefined);
    },
    get messages(): BehaviorSubject<IMessagesItem[]> {
      return new BehaviorSubject<IMessagesItem[]>([
        testMessages1,
        testMessages2,
      ]);
    },
    deleteMessage(message: IMessagesItem) {},
  };

  const mockAuthService = {
    get uid(): string | undefined {
      return testUid1;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ProfileService, useValue: mockProfileService },
        { provide: AuthService, useValue: mockAuthService },
      ],
      declarations: [MessagesComponent, TimePipe],
    }).compileComponents();

    profileService = TestBed.inject(ProfileService);
    authService = TestBed.inject(AuthService);

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('currChat => must be equal testCurrChat', () => {
    expect(component.currChat).toEqual(testCurrChat);
  });

  it('messages => must be equal ', () => {
    expect(component.messages[0]).toEqual(testMessages1);
  });

  it('PipeTransform() => must be parse time', () => {
    const date = fixture.debugElement.queryAll(By.css('div.messages__date'));
    const time1 = String(date[0].nativeElement.innerHTML).trim();
    const time2 = String(date[1].nativeElement.innerHTML).trim();
    expect(time1).toEqual(testParseTime1);
    expect(time2).toEqual(testParseTime2);
  });

  it('deleteMessage(item) => search btns[0] and click, then must be called with(item)', () => {
    const mockIsDeleteMessage = spyOn(
      profileService,
      'deleteMessage'
    ).and.callFake((message: IMessagesItem) => {});
    mockIsDeleteMessage.calls.reset();

    const mockUid = spyOnProperty(authService, 'uid', 'get').and.returnValue(
      testUid1
    );
    mockUid.calls.reset();

    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button.messages__delete'));
    btn.nativeElement.click();
    expect(mockIsDeleteMessage).toHaveBeenCalledWith(testMessages1);
    expect(mockIsDeleteMessage).toHaveBeenCalledTimes(1);
  });
});
