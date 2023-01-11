import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header/header.service';

import { AboutProjectService } from './services/aboutProject/about-project.service';
import { ModalService } from './services/modal/modal.service';
import { PopupService } from './services/popup/popup.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectsService } from 'src/app/pages/projects/services/projects/projects.service';
import { IMenuProject } from 'src/app/components/menu-project/interfaces/menu-project/i-menu-project';
import { InfoProjectService } from 'src/app/components/info-project/services/info-project/info-project.service';
import { IInfoProject } from 'src/app/components/info-project/interfaces/info-project/i-info-project';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
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
export class TodoComponent implements OnInit {
  private _routeEvent$!: Subscription;
  private readonly _metaMenu: IMenuProject = {
    link: environment.URL_GIT_PROJECTS.todo,
    title: 'todo',
    color: '#00c3ff',
  };

  constructor(
    private _router: Router,
    private _headerService: HeaderService,
    private _projectsService: ProjectsService,
    private _modalService: ModalService,
    private _popupService: PopupService,
    private _infoProjectService: InfoProjectService,
    private readonly _aboutProjectService: AboutProjectService
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

  get isHideModal(): boolean {
    return this._modalService.isHide();
  }
  get isHidePopup(): boolean {
    return this._popupService.isHide();
  }
  get isHideInfo(): boolean {
    return this._infoProjectService.isHide();
  }
  get aboutData(): IInfoProject[] {
    return this._aboutProjectService.about;
  }
  get metaMenu(): IMenuProject {
    return this._metaMenu;
  }
}
