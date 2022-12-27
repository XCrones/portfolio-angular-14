import { Component, OnInit } from '@angular/core';
import { NeonService } from 'src/app/services/neon/neon.service';
import { HeaderService } from 'src/app/services/header/header.service';
import { ProjectsService } from './services/projects/projects.service';
import { IRouterLinkItem, ROUTER_LINKS } from 'src/app/app-routing.module';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public projects!: IRouterLinkItem[];

  constructor(
    private _projectsService: ProjectsService,
    private _neonService: NeonService,
    private _headerService: HeaderService
  ) {
    this.projects = Object.values(ROUTER_LINKS.projects.children);
  }

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

  projectIcon = (projectTitle: string) => {
    switch (projectTitle) {
      case ROUTER_LINKS.projects.children.todo.title:
        return 'checklist';
      case ROUTER_LINKS.projects.children.shop.title:
        return 'shopping_cart_checkout';
      case ROUTER_LINKS.projects.children.chat.title:
        return 'chat';
      default:
        return 'menu_book';
    }
  };
}
