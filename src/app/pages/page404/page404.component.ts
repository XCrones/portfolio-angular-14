import { Component, OnInit } from '@angular/core';
import { NeonService } from 'src/app/services/neon/neon.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit {
  constructor(private neonService: NeonService) {}

  ngOnInit(): void {}

  get stateNeon(): boolean {
    return this.neonService.isEnable();
  }
}
