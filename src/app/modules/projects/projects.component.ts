import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NeonService } from 'src/app/services/neon/neon.service';
import { HeaderService } from 'src/app/services/header/header.service';
import { ProjectsService } from './services/projects/projects.service';

@Component({
  selector: 'app-projects',
  animations: [
    trigger('showItems', [
      state(
        '*',
        style({
          opacity: 0,
          transform: 'translateX(-50%)',
        })
      ),
      state('source0', style({})),
      state('source1', style({})),
      state('source2', style({})),
      transition('* => source0', [animate('0.7s')]),
      transition('* => source1', [animate('0.5s')]),
      transition('* => source2', [animate('0.3s')]),
    ]),
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(
    private _projectsService: ProjectsService,
    private _neonService: NeonService,
    private _headerService: HeaderService
  ) {}

  ngOnInit(): void {}

  get isHidePorjects(): boolean {
    return this._projectsService.isHide();
  }
  get neonState(): boolean {
    return this._neonService.isEnable();
  }

  toggleHideHeader() {
    this._headerService.isHide(!this._headerService.isHide());
  }
}
