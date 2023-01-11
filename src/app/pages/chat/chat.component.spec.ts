import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderService } from 'src/app/services/header/header.service';
import { AuthService } from '../auth/services/auth/auth.service';
import { IInfoProject } from '../info-project/interfaces/info-project/i-info-project';
import { InfoProjectService } from '../info-project/services/info-project/info-project.service';
import { ProjectsService } from '../projects/services/projects/projects.service';

import { ChatComponent } from './chat.component';
import { AboutProjectService } from './services/aboutProject/about-project.service';
import { ProfileService } from './services/profile/profile.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let authService: AuthService;
  let profileService: ProfileService;

  const mockHeaderService = jasmine.createSpyObj(['isHide']);
  const mockProjectsService = jasmine.createSpyObj(['isHide']);
  const mockInfoProjectService = jasmine.createSpyObj(['isHide']);

  const mockAboutProjectService = {
    get about(): IInfoProject[] {
      return [];
    },
  };

  const mockAuthService = {
    get isAuth(): boolean {
      return false;
    },
  };

  const mockProfileService = {
    get isLoadProfile(): boolean {
      return false;
    },
    isHideCreate(state: boolean) {},
    isHideJoin(state: boolean) {},
    tryProfile(value: string) {},
    createChat(): Promise<boolean> {
      return Promise.reject(false);
    },
    joinChat(): Promise<boolean> {
      return Promise.reject(false);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: HeaderService, useValue: mockHeaderService },
        { provide: ProjectsService, useValue: mockProjectsService },
        { provide: InfoProjectService, useValue: mockInfoProjectService },
        { provide: AboutProjectService, useValue: mockAboutProjectService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ProfileService, useValue: mockProfileService },
      ],
      declarations: [ChatComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    profileService = TestBed.inject(ProfileService);

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockHeaderService.isHide.calls.reset();
    mockProjectsService.isHide.calls.reset();
    mockInfoProjectService.isHide.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getUser(string) => must be called tryProfile(string)', () => {
    const mock = spyOn(mockProfileService, 'tryProfile').and.callFake(
      (alue: string) => {}
    );
    mock.calls.reset();

    component.getUser('test uid');
    expect(mock).toHaveBeenCalledWith('test uid');
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('resetJoinCreate() => must be call isHideCreate(true), isHideJoin(true). isLoadJoinCreate must be false responseCreate must be `` ', () => {
    const mockCreate = spyOn(mockProfileService, 'isHideCreate').and.callFake(
      (bool: boolean) => {}
    );
    mockCreate.calls.reset();

    const mockJoin = spyOn(mockProfileService, 'isHideJoin').and.callFake(
      (bool: boolean) => {}
    );
    mockJoin.calls.reset();

    component.resetJoinCreate();
    expect(component.isLoadJoinCreate).toBe(false);
    expect(component.responseCreate).toEqual('');
    expect(mockCreate).toBeTruthy();
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockJoin).toBeTruthy();
    expect(mockJoin).toHaveBeenCalledTimes(1);
    expect(component.isResetAddCreateForm).toBeTruthy();
  });

  it('createChat() => await resolve and called resetJoinCreate()', async () => {
    const mockProfileService = spyOn(
      profileService,
      'createChat'
    ).and.returnValue(Promise.resolve(true));
    mockProfileService.calls.reset();

    spyOn(component, 'resetJoinCreate').and.callFake(() => {});
    await component.createChat('test name chat');

    expect(mockProfileService).toHaveBeenCalledWith('test name chat');
    expect(component.resetJoinCreate).toHaveBeenCalled();
  });

  it('createChat() => await reject and responseCreate must be equal (test reject)', async () => {
    const mockProfileService = spyOn(
      profileService,
      'createChat'
    ).and.returnValue(Promise.resolve(false));
    mockProfileService.calls.reset();

    spyOn(component, 'resetJoinCreate').and.callFake(() => {});

    await component.createChat('test name chat');
    expect(component.resetJoinCreate).not.toHaveBeenCalled();
  });

  it('joinChat() => await resolve and called resetJoinCreate()', async () => {
    const mockCreate = spyOn(profileService, 'joinChat').and.returnValue(
      Promise.resolve(true)
    );
    mockCreate.calls.reset();

    spyOn(component, 'resetJoinCreate').and.callFake(() => {});
    await component.joinChat('test name chat');

    expect(mockCreate).toHaveBeenCalledWith('test name chat');
    expect(component.resetJoinCreate).toHaveBeenCalled();
  });

  it('joinChat() => await reject and responseCreate must be equal (test reject)', async () => {
    const testnameChat = 'test name chat';
    const mockCreate = spyOn(profileService, 'joinChat').and.returnValue(
      Promise.resolve(false)
    );
    mockCreate.calls.reset();

    spyOn(component, 'resetJoinCreate').and.callFake(() => {});

    await component.joinChat(testnameChat);
    expect(component.resetJoinCreate).not.toHaveBeenCalled();
    expect(component.responseCreate).toEqual(
      `чата ${testnameChat} не существует`
    );
  });
});
