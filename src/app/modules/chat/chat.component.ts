import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header/header.service';
import { IInfoProject } from '../info-project/interfaces/info-project/i-info-project';
import { InfoProjectService } from '../info-project/services/info-project/info-project.service';
import { IMenuProject } from '../menu-project/interfaces/menu-project/i-menu-project';
import { ProjectsService } from '../projects/services/projects/projects.service';
import { AboutProjectService } from './services/aboutProject/about-project.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AuthService } from '../auth/services/auth/auth.service';
import { ProfileService } from './services/profile/profile.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [InfoProjectService],
  animations: [
    trigger('openClose', [
      state(
        'popupShow',
        style({
          scale: '1',
          opacity: '1',
        })
      ),
      state(
        'popupHide',
        style({
          scale: '0',
          opacity: '0',
        })
      ),
      transition('popupShow <=> popupHide', [
        animate('0.3s cubic-bezier(.35, 0, .25, 1)'),
      ]),
    ]),
  ],
})
export class ChatComponent implements OnInit {
  private _routeEvent$!: Subscription;
  readonly metaMenu: IMenuProject = {
    link: environment.URL_GIT_PROJECTS.chat,
    title: 'chat',
    color: '#00c3ff',
  };

  private _isLoadJoinCreate: boolean = false;
  private _respJoinCreate: string = '';
  private _isResetJoinCreate: boolean = false;

  constructor(
    private _headerService: HeaderService,
    private _projectsService: ProjectsService,
    private _router: Router,
    private _infoProjectService: InfoProjectService,
    private _aboutProjectService: AboutProjectService,
    private _authService: AuthService,
    private _profileService: ProfileService
  ) {
    this._routeEvent$ = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._headerService.isHide(true);
        this._projectsService.isHide(true);
      }
      if (event instanceof NavigationStart) {
        this._headerService.isHide(false);
        this._projectsService.isHide(false);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this._routeEvent$.unsubscribe();
  }

  get isHideInfo(): boolean {
    return this._infoProjectService.isHide();
  }
  get aboutData(): Array<IInfoProject> {
    return this._aboutProjectService.about;
  }
  get isAuth(): boolean {
    return this._authService.isAuth;
  }
  get isLoadProfile(): boolean {
    return this._profileService.isLoadProfile;
  }
  get isHideCreate(): boolean {
    return this._profileService.isHideCreate();
  }
  get isHideJoin(): boolean {
    return this._profileService.isHideJoin();
  }
  get isLoadJoinCreate(): boolean {
    return this._isLoadJoinCreate;
  }
  get responseCreate(): string {
    return this._respJoinCreate;
  }
  get isResetAddCreateForm(): boolean {
    return this._isResetJoinCreate;
  }

  getUser(uid: string) {
    this._profileService.tryProfile(uid);
  }

  async createChat(nameChat: string) {
    this._isLoadJoinCreate = true;
    this._respJoinCreate = '';
    const result = await this._profileService.createChat(nameChat);

    if (result) {
      this.resetJoinCreate();
    } else {
      this._respJoinCreate = 'имя чата занято';
    }

    this._isLoadJoinCreate = false;
  }

  async joinChat(nameChat: string) {
    this._isLoadJoinCreate = true;
    this._respJoinCreate = '';
    const result = await this._profileService.joinChat(nameChat);

    if (result) {
      this.resetJoinCreate();
    } else {
      this._respJoinCreate = `чата ${nameChat} не существует`;
    }
    this._isLoadJoinCreate = false;
  }

  resetJoinCreate() {
    this._isLoadJoinCreate = false;
    this._respJoinCreate = '';
    this._profileService.isHideCreate(true);
    this._profileService.isHideJoin(true);
    this._isResetJoinCreate = !this._isResetJoinCreate;
  }
}
