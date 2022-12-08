import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { AboutMeService } from 'src/app/modules/home/services/about-me.service';
import {
  HeaderService,
  IProjects,
} from 'src/app/services/header/header.service';
import { NeonService } from 'src/app/services/neon/neon.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          top: '70px',
        })
      ),
      state(
        'closed',
        style({
          top: '-150px',
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('* => open', [animate('0.5s')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  private _isOpenHamburger = false;

  constructor(
    private _neonService: NeonService,
    private _headerService: HeaderService,
    private _aboutmeService: AboutMeService,
    private _shadowService: ShadowService
  ) {}

  ngOnInit(): void {
    let width = window.innerWidth;
    this.hideHamburger(width);
  }

  get neon(): boolean {
    return this._neonService.isEnable();
  }
  get hamburger(): boolean {
    return this._isOpenHamburger;
  }
  get projects(): IProjects[] {
    return this._headerService.projects;
  }
  get currFramework(): string {
    return this._aboutmeService.aboutMe.frameWork;
  }

  isCurrFramework(frameWork: string | undefined): boolean {
    return !!frameWork ? this.currFramework.includes(frameWork) : false;
  }

  getlink(project: IProjects): string | undefined {
    return this.isCurrFramework(project.title) ? undefined : project.link;
  }

  getColor(frameWork: string): string {
    return this._shadowService.getColorProject(frameWork);
  }

  toggleNeon() {
    this._neonService.isEnable(!this._neonService.isEnable());
  }

  toggleHamburger() {
    this._isOpenHamburger = !this._isOpenHamburger;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hideHamburger(event.target.innerWidth);
  }

  hideHamburger(width: number) {
    if (width >= 768) {
      this._isOpenHamburger = false;
    }
  }
}
