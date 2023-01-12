import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IModal,
  ModalService,
} from 'src/app/pages/todo/services/modal/modal.service';
import { PopupService } from 'src/app/pages/todo/services/popup/popup.service';
import {
  ITasks,
  TasksService,
} from 'src/app/pages/todo/services/tasks/tasks.service';
import { NeonService } from 'src/app/services/neon/neon.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit, OnDestroy {
  private _tasks: ITasks[] = [];
  private _tasks$!: Subscription;

  constructor(
    private _neonService: NeonService,
    private _tasksService: TasksService,
    private _popupService: PopupService,
    private _modalService: ModalService
  ) {
    this._tasks$ = this._tasksService.taskList.subscribe((sub) => {
      this._tasks = sub;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._tasks$.unsubscribe();
  }

  get neonState(): boolean {
    return this._neonService.isEnable();
  }

  createNewTask() {
    this._popupService.createNew();
  }

  deleteAllTasks() {
    const deleteDate: IModal = {
      isGlobal: true,
      id: -1,
      title: '',
    };
    this._modalService.setDeleteTask(deleteDate);
  }

  completeAllTasks() {
    this._tasksService.toggleStatus(-1, true, true);
  }

  setAllTasks() {
    this._tasksService.toggleStatus(-1, true, false);
  }

  sumTasks(): number {
    return this._tasks.length;
  }

  pctOkTasks(): number {
    return Math.round(
      (100 * this._tasks.filter((item) => item.status).length) /
        this._tasks.length
    );
  }

  sumOkTasks(): number {
    return this._tasks.filter((item) => item.status).length;
  }

  pctNokTasks(): number {
    return Math.round(
      (100 * this._tasks.filter((item) => !item.status).length) /
        this._tasks.length
    );
  }

  sumNokTasks(): number {
    return this._tasks.filter((item) => !item.status).length;
  }
}
