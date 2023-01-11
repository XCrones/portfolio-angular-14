import { TestBed } from '@angular/core/testing';
import { ITasks } from '../../interfaces/tasks/i-tasks';
import { TasksService } from '../tasks/tasks.service';
import { PopupService } from './popup.service';

describe('PopupService', () => {
  let service: PopupService;
  let fakeTasksService: TasksService;
  const mockTasksService = jasmine.createSpyObj(['pushNew', 'saveEdited']);

  mockTasksService.pushNew.and.callFake((item: ITasks) => {});
  mockTasksService.saveEdited.and.callFake((item: ITasks) => {});

  let testTask: ITasks = {
    id: 222,
    name: '',
    category: '',
    priority: 0,
    date: '',
    status: false,
    description: '',
  };

  const testPattern: ITasks = {
    id: 0,
    name: '',
    category: 'none',
    priority: 0,
    date: '',
    status: false,
    description: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PopupService,
        { provide: TasksService, useValue: mockTasksService },
      ],
    });
    service = TestBed.inject(PopupService);
    fakeTasksService = TestBed.inject(TasksService);

    mockTasksService.pushNew.calls.reset();
    mockTasksService.saveEdited.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isHideCreate() => should be default is true, isHideCreate(true|false) return true|false', () => {
    expect(service.isHide()).toBeTruthy();
    expect(service.isHide(true)).toBeTruthy();
    expect(service.isHide(false)).toBeFalsy();
  });

  it('setEditItem(item) => must be isHide() return false and subscribe must be equal item', (done) => {
    service.setEditItem(testTask);
    service.editItem.subscribe((sub) => {
      expect(sub).toEqual(testTask);
      expect(service.isHide()).toBeFalse();
      done();
    });
  });

  it('createNew() => must be isHide() return false and subscribe must be equal pattern', (done) => {
    service.createNew();
    service.editItem.subscribe((sub) => {
      expect(sub).toEqual(testPattern);
      expect(service.isHide()).toBeFalse();
      done();
    });
  });

  it('close() => must be isHide() return true ', () => {
    service.close();
    expect(service.isHide()).toBeTruthy();
  });

  it('saveItem(item) => if saveEdited = false, call saveEdited(item), else call pushNew(item) ', () => {
    service.saveItem(testTask);
    expect(mockTasksService.saveEdited).toHaveBeenCalledWith(testTask);
  });

  it('saveItem(item) => if saveEdited = false, call saveEdited(item), else call pushNew(item) ', () => {
    service.createNew();
    service.saveItem(testTask);
    expect(mockTasksService.pushNew).toHaveBeenCalledWith(testTask);
  });
});
