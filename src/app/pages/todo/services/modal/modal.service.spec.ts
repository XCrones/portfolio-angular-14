import { TestBed } from '@angular/core/testing';
import { IModal } from '../../interfaces/modal/i-modal';
import { TasksService } from '../tasks/tasks.service';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;
  let fakeTasksService: TasksService;
  const mockTasksService = jasmine.createSpyObj(['tasksDelete']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: TasksService, useValue: mockTasksService },
      ],
    });
    service = TestBed.inject(ModalService);
    fakeTasksService = TestBed.inject(TasksService);

    mockTasksService.tasksDelete.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isHide() => should be default is true, isHide(true|false) return true|false', () => {
    expect(service.isHide()).toBeTruthy();
    expect(service.isHide(true)).toBeTruthy();
    expect(service.isHide(false)).toBeFalsy();
  });

  it('setDeleteTask(global) => isHide must be true before and after, title delete message cant eqaul pattern', () => {
    const data: IModal = {
      isGlobal: true,
      id: 0,
      title: '',
    };

    expect(service.isHide()).toBeTruthy();
    service.setDeleteTask(data);
    service.confirm(true);
    expect(service.isHide()).toBeTruthy();
    expect(service.dataDelete.title).toEqual('удалить всё?');
    expect(mockTasksService.tasksDelete).toHaveBeenCalledWith(0, true);
    expect(mockTasksService.tasksDelete).toHaveBeenCalledTimes(1);
  });

  it('setDeleteTask(item) => isHide must be true before and after, title delete message cant eqaul item title', () => {
    const data: IModal = {
      isGlobal: false,
      id: 22,
      title: 'test',
    };
    expect(service.isHide()).toBeTruthy();
    service.setDeleteTask(data);
    service.confirm(true);
    expect(service.isHide()).toBeTruthy();
    expect(service.dataDelete.title).toEqual(data.title);
    expect(service.dataDelete.id).toEqual(data.id);
    expect(mockTasksService.tasksDelete).toHaveBeenCalledWith(data.id);
    expect(mockTasksService.tasksDelete).toHaveBeenCalledTimes(1);
  });
});
