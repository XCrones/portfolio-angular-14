import { Component, Input, OnInit } from '@angular/core';
import { IRouterLinkItem, ROUTER_LINKS } from 'src/app/app-routing.module';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() neonState: boolean = false;
  @Input() hamburgerState: boolean = false;

  public links!: IRouterLinkItem[];

  constructor() {
    this.links = Object.values(ROUTER_LINKS).map((value) => value);
  }

  ngOnInit(): void {}
}
