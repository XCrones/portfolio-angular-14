import { Injectable } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';

export interface IDelete {
  id: number;
  name: string;
}

export interface IModal {
  isGlobal: boolean;
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private tasksService: TasksService) {}

  private _isHide: boolean = true;

  isHide(state?: boolean | undefined): boolean {
    this._isHide = state != undefined ? state : this._isHide;
    return this._isHide;
  }

  private _dataDelete: IModal = {
    id: 0,
    isGlobal: false,
    title: '',
  };

  get dataDelete(): IModal {
    return this._dataDelete;
  }

  setDeleteTask(dataDelete: IModal) {
    Object.assign(this._dataDelete, dataDelete);
    if (this._dataDelete.isGlobal) {
      this._dataDelete.title = 'удалить всё?';
    }
    this.isHide(false);
  }

  confirm(response: boolean) {
    if (!this._dataDelete.isGlobal) {
      if (response) {
        this.tasksService.tasksDelete(this.dataDelete.id);
      }
    } else {
      if (response) {
        this.tasksService.tasksDelete(0, response);
      }
    }
    this.isHide(true);
  }
}
