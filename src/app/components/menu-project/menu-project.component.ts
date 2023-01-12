import { Component, Input, OnInit } from '@angular/core';
import { NeonService } from 'src/app/services/neon/neon.service';
import { InfoProjectService } from '../info-project/services/info-project/info-project.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header/services/header.service';

export interface IMenuProject {
  link: string;
  title: string;
  color: string;
}

@Component({
  selector: 'app-menu-project',
  templateUrl: './menu-project.component.html',
  styleUrls: ['./menu-project.component.scss'],
})
export class MenuProjectComponent implements OnInit {
  @Input() styleMenu: IMenuProject = {
    link: '#',
    title: 'undefined',
    color: '#fff',
  };

  constructor(
    private _router: Router,
    private _neonService: NeonService,
    private _headerService: HeaderService,
    private _infoProjectService: InfoProjectService
  ) {}

  ngOnInit(): void {}

  get neonState(): boolean {
    return this._neonService.isEnable();
  }

  get isHideHeader(): boolean {
    return this._headerService.isHide();
  }

  get isHideInfo(): boolean {
    return this._infoProjectService.isHide();
  }

  navBack() {
    this._router.navigate(['projects']);
  }

  toggleHideHeader() {
    this._headerService.isHide(!this._headerService.isHide());
  }

  showAbout() {
    this._infoProjectService.isHide(!this._infoProjectService.isHide());
  }
}
