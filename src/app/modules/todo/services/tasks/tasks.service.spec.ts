import { TestBed } from '@angular/core/testing';
import { ISorting } from '../../interfaces/sorting/i-sorting';
import { ITasks } from '../../interfaces/tasks/i-tasks';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const item: ITasks = {
    id: 0,
    name: 'pushNew',
    category: '',
    priority: 0,
    date: '',
    status: false,
    description: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('taskList => must be return observable item and item.id must be 1', () => {
    service.taskList.subscribe((sub) => {
      expect(sub[0].id).toBe(1);
    });
  });

  it('toggleStatus(1) => sub[0].status must be true', () => {
    service.toggleStatus(1);
    service.taskList.subscribe((sub) => {
      expect(sub[0].status).toBeTruthy();
    });
  });

  it('toggleStatus() => sub[0].status must be false', () => {
    service.toggleStatus(0, true, false);
    service.taskList.subscribe((sub) => {
      const task = sub[0];
      expect(task.status).toBeFalsy();
    });
  });

  it('delete() => sub.length must be 0', () => {
    service.tasksDelete(1);
    service.taskList.subscribe((sub) => {
      const task = sub[0];
      expect(task.id).toBe(2);

      service.tasksDelete(0, true);
      expect(sub.length).toBe(0);
    });
  });

  it('pushNew() => lastItem.date must be eqaul date, lastItem.id must be equal id, lastItem.name must be equal name', () => {
    service.taskList.subscribe((sub) => {
      const date = String(new Date().toISOString().split('T')[0]);
      let id = 6;
      service.pushNew(item);
      let lastItem = sub.slice(-1);
      expect(lastItem[0].id).toBe(id);
      expect(lastItem[0].date).toEqual(date);
      expect(lastItem[0].name).toEqual(item.name);

      service.tasksDelete(0, true);
      id = 1;
      service.pushNew(item);
      lastItem = sub.slice(-1);
      expect(lastItem[0].id).toBe(id);
      expect(lastItem[0].date).toEqual(date);
      expect(lastItem[0].name).toEqual(item.name);
    });
  });

  it('saveEdited() => sub[0] must be equal item', () => {
    const date = String(new Date().toISOString().split('T')[0]);
    const item: ITasks = {
      id: 1,
      name: 'saveEdited',
      category: '',
      priority: 0,
      date: date,
      status: false,
      description: '',
    };
    service.saveEdited(item);
    service.taskList.subscribe((sub) => {
      expect(sub[0].name).toEqual(item.name);
    });
  });

  it('sorting() => must be sort', () => {
    service.taskList.subscribe((sub) => {
      let sortOption: ISorting = {
        type: 'name',
        state: false,
      };
      service.sort(sortOption);
      expect(sub[0].id).toBe(1);

      sortOption.type = 'category';
      service.sort(sortOption);
      expect(sub[0].id).toBe(1);

      sortOption.type = 'priority';
      service.sort(sortOption);
      expect(sub[0].id).toBe(2);

      sortOption.type = 'date';
      service.sort(sortOption);
      expect(sub[0].id).toBe(1);

      sortOption.type = 'status';
      sortOption.state = true;
      service.sort(sortOption);
      expect(sub[0].id).toBe(4);
    });
  });
});
