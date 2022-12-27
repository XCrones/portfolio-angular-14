import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header/header.service';
import { IInfoProject } from '../info-project/interfaces/info-project/i-info-project';
import { InfoProjectService } from '../info-project/services/info-project/info-project.service';
import { IMenuProject } from '../menu-project/interfaces/menu-project/i-menu-project';
import { ProjectsService } from '../projects/services/projects/projects.service';
import { AboutProjectService } from './services/aboutProject/about-project.service';
import { PopupService } from './services/popup/popup.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
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
export class ShopComponent implements OnInit {
  private _routeEvent$: any = undefined;

  readonly styleMenu: IMenuProject = {
    link: environment.URL_GIT_PROJECTS.shop,
    title: 'shop',
    color: '#00c3ff',
  };

  constructor(
    private _infoProjectService: InfoProjectService,
    private _popupService: PopupService,
    private _aboutProjectService: AboutProjectService,
    private _router: Router,
    private _headerService: HeaderService,
    private _projectsService: ProjectsService
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

  get isHidePopup(): boolean {
    return this._popupService.isHide;
  }
  get isHideInfo(): boolean {
    return this._infoProjectService.isHide();
  }
  get aboutData(): Array<IInfoProject> {
    return this._aboutProjectService.about;
  }
}
