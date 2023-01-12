import { Component, Input, OnInit } from '@angular/core';
import { NeonService } from 'src/app/services/neon/neon.service';
import {
  IInfoProject,
  InfoProjectService,
} from './services/info-project/info-project.service';

@Component({
  selector: 'app-info-project',
  templateUrl: './info-project.component.html',
  styleUrls: ['./info-project.component.scss'],
})
export class InfoProjectComponent implements OnInit {
  @Input() info: IInfoProject[] = [];
  private _tempData: IInfoProject[] = [];
  private _nameProject: string | undefined = 'undefined';

  constructor(
    private _infoProjectService: InfoProjectService,
    private _neonState: NeonService
  ) {}

  ngOnInit(): void {
    this.deleteNameProject(this.info);
  }

  get neonState(): boolean {
    return this._neonState.isEnable();
  }
  get nameProject(): string | undefined {
    return this._nameProject;
  }
  get tempData(): IInfoProject[] {
    return this._tempData;
  }

  deleteNameProject(arr: IInfoProject[]) {
    let tempIndex = arr.findIndex(
      (value) => typeof value['nameProject'] !== 'undefined'
    );

    this._nameProject =
      tempIndex === -1 ? 'undefined' : String(this.info[tempIndex].nameProject);

    this._tempData = [...this.info];
    if (tempIndex != -1) {
      this._tempData.splice(tempIndex, 1);
    }
  }

  close() {
    this._infoProjectService.isHide(true);
  }
}
