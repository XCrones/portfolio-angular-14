import { Component, HostListener, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AboutMeService } from './services/about-me.service';
import { Skills } from './interfaces/skills';
import { AboutMe } from './interfaces/about-me';
import { NeonService } from 'src/app/services/neon/neon.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';

@Component({
  selector: 'app-home',
  animations: [
    trigger('showItems', [
      state(
        '*',
        style({
          scale: 0,
          transform: 'translateX(-100px)',
        })
      ),
      state(
        'showImg',
        style({
          scale: 1,
        })
      ),
      state(
        'showTitle',
        style({
          scale: 1,
        })
      ),
      state(
        'showText',
        style({
          scale: 1,
        })
      ),
      transition('* => showImg', [animate('0.4s')]),
      transition('* => showTitle', [animate('0.5s')]),
      transition('* => showText', [animate('0.6s')]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PaginatorV2Service],
})
export class HomeComponent implements OnInit {
  constructor(
    private _aboutMeService: AboutMeService,
    private _neonService: NeonService,
    private _paginatorService: PaginatorV2Service,
    private _shadowService: ShadowService
  ) {}

  ngOnInit(): void {
    const width = window.innerWidth;
    this.resizePaginator(width);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let width = event.target.innerWidth;
    this.resizePaginator(width);
  }

  resizePaginator(width: number) {
    if (width < 1024) {
      this.paginator.init(3);
    } else if (width >= 1024) {
      this.paginator.init(6);
    }
  }

  get paginator(): any {
    return this._paginatorService;
  }
  get neon(): any {
    return this._neonService.isEnable();
  }
  get mySkills(): Skills[] {
    return this._aboutMeService.mySkills;
  }
  get aboutMe(): AboutMe {
    return this._aboutMeService.aboutMe;
  }
  get colorRed(): string {
    return this._shadowService.mainShadowRed;
  }
  get colorRedNeon(): string {
    return this._shadowService.mainShadowRedLink;
  }
}
