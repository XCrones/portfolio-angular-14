import { Component, Input, OnInit } from '@angular/core';
import { INavItem } from 'src/app/interfaces/nav-item/i-nav-item';
import { HeaderService } from 'src/app/services/header/header.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() neonState: boolean = false;
  @Input() hamburgerState: boolean = false;

  constructor(private _headerService: HeaderService) {}

  ngOnInit(): void {}

  get itemsNav(): Array<INavItem> {
    return this._headerService.itemsNav;
  }
}
