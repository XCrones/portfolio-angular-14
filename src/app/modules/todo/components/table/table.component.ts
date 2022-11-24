import { Component, OnInit } from '@angular/core';
import { IModal } from '../../interfaces/modal/i-modal';
import { ISorting } from '../../interfaces/sorting/i-sorting';
import { ITasks } from '../../interfaces/tasks/i-tasks';
import { IThead } from '../../interfaces/thead/i-thead';
import { ModalService } from '../../services/modal/modal.service';
import { PopupService } from '../../services/popup/popup.service';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  readonly theadTable: Array<IThead> = [
    { title: 'название', filter: 'name' },
    { title: 'категория', filter: 'category' },
    { title: 'приоритет', filter: 'priority' },
    { title: 'дата', filter: 'date' },
    { title: 'статус', filter: 'status' },
  ];

  filter: string = '';
  stateFilter: boolean = false;

  private _tasks: ITasks[] = [];

  constructor(
    private _tasksService: TasksService,
    private _popupService: PopupService,
    private _modalService: ModalService
  ) {
    this._tasksService.taskList.subscribe((sub) => {
      if (sub != undefined) {
        this._tasks = sub;
      }
    });
  }

  ngOnInit(): void {}

  get tasks(): ITasks[] {
    return this._tasks;
  }

  editItem(item: ITasks) {
    if (!item.status) {
      this._popupService.setEditItem(item);
    }
  }

  deleteItem(item: ITasks) {
    const deleteDate: IModal = {
      isGlobal: false,
      id: item.id,
      title: item.name,
    };
    this._modalService.setDeleteTask(deleteDate);
  }

  completeItem(id: number) {
    this._tasksService.toggleStatus(id);
  }

  toggleFilter(value: string) {
    this.stateFilter = this.filter === value ? !this.stateFilter : false;
    this.filter = value;
    const params: ISorting = {
      type: value,
      state: this.stateFilter,
    };
    this._tasksService.sort(params);
  }
}
