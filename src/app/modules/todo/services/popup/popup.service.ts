import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITasks } from '../../interfaces/tasks/i-tasks';
import { TasksService } from '../tasks/tasks.service';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private _tasksService: TasksService) {}

  private _isHide: boolean = true;
  private isNew: boolean = false;
  private editItem$: BehaviorSubject<ITasks> = new BehaviorSubject<ITasks>({
    id: 0,
    name: '',
    category: 'none',
    priority: 0,
    date: '',
    status: false,
    description: '',
  });

  get editItem(): Subject<ITasks> {
    return this.editItem$;
  }

  isHide(state?: boolean | undefined): boolean {
    this._isHide = state != undefined ? state : this._isHide;
    return this._isHide;
  }

  setEditItem(item: ITasks) {
    this.isNew = false;
    this.isHide(false);
    this.editItem$.next(item);
  }

  createNew() {
    this.isNew = true;
    this.isHide(false);
    this.editItem$.next({
      id: 0,
      name: '',
      category: 'none',
      priority: 0,
      date: '',
      status: false,
      description: '',
    });
  }

  saveItem(item: ITasks) {
    if (this.isNew) {
      this._tasksService.pushNew(item);
    } else {
      this._tasksService.saveEdited(item);
    }
    this.close();
  }

  close() {
    this.isHide(true);
  }
}
