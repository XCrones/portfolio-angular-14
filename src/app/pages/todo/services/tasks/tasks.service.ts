import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ISorting {
  type: string;
  state: boolean;
}

export interface ITasks {
  id: number;
  name: string;
  category: string;
  priority: number;
  date: string;
  status: boolean;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks$: BehaviorSubject<ITasks[]> = new BehaviorSubject<ITasks[]>([
    {
      id: 1,
      name: 'изучить angular',
      category: 'обучение',
      priority: 2,
      date: '2022-04-29',
      status: false,
      description: 'изучить angular и все связанные с ним технологии',
    },
    {
      id: 2,
      name: 'продать honor',
      category: 'продажа',
      priority: 0,
      date: '2022-09-01',
      status: true,
      description: 'продать фитнес браслет honor',
    },
    {
      id: 3,
      name: 'купить apple watch',
      category: 'покупка',
      priority: 1,
      date: '2022-06-02',
      status: false,
      description: 'купить apple watch',
    },
    {
      id: 4,
      name: 'отдых на горе море',
      category: 'поездка',
      priority: 1,
      date: '2022-09-20',
      status: true,
      description: 'поехать с палатками на горе море',
    },
    {
      id: 5,
      name: 'сходить на брусья',
      category: 'спорт',
      priority: 2,
      date: '2022-08-03',
      status: false,
      description: 'отжиматься на брусьях',
    },
  ]);

  constructor() {}

  get taskList(): BehaviorSubject<ITasks[]> {
    return this.tasks$;
  }

  getCategories(): string[] {
    const categories = this.tasks$.value.map((value) =>
      value.category.toLowerCase()
    );
    return categories as string[];
  }

  toggleStatus(itemId: number, isGlobal?: boolean, statusGlobal?: boolean) {
    if (isGlobal === undefined && this.tasks$.value.length > 0) {
      this.tasks$.value.find((item) => {
        if (item.id === itemId) {
          item.status = !item.status;
        }
      });
    }
    if (isGlobal && statusGlobal != undefined) {
      this.tasks$.value.map((item) => {
        item.status = statusGlobal;
      });
    }
  }

  tasksDelete(itemId: number, isGlobal?: boolean) {
    if (isGlobal === undefined && this.tasks$.value.length > 0) {
      this.tasks$.next(this.tasks$.value.filter((item) => item.id != itemId));
    }
    if (isGlobal) {
      this.tasks$.value.length = 0;
    }
  }

  pushNew(item: ITasks) {
    let tempItem = JSON.parse(JSON.stringify(item));
    tempItem.date = String(new Date().toISOString().split('T')[0]);
    let lastElem = this.tasks$.value.slice(-1);
    tempItem.id = lastElem.length > 0 ? lastElem[0].id + 1 : 1;
    this.tasks$.value.push(tempItem);
  }

  saveEdited(item: ITasks) {
    let search = this.tasks$.value.find((v) => v.id === item.id);
    if (search != undefined) {
      Object.assign(search, item);
      const date = String(new Date().toISOString().split('T')[0]);
      search.date = date;
    }
  }

  sort(option: ISorting) {
    this.taskList.value.sort((a, b) => {
      switch (option.type) {
        case 'name':
          return this.sortValue(
            a.name.toLowerCase(),
            b.name.toLowerCase(),
            option.state
          );

        case 'date':
          return this.sortValue(a.date, b.date, option.state);

        case 'status':
          return this.sortValue(a.status, b.status, option.state);

        case 'priority':
          return this.sortValue(a.priority, b.priority, option.state);

        case 'category':
          return this.sortValue(a.category, b.category, option.state);

        default:
          return 0;
      }
    });
  }

  private sortValue(a: any, b: any, state: boolean) {
    return a < b ? (state ? 1 : -1) : state ? -1 : 1;
  }
}
