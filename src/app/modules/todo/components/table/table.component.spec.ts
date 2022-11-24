import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ResizeDirective } from '../../directives/resize/resize.directive';
import { ISorting } from '../../interfaces/sorting/i-sorting';
import { ITasks } from '../../interfaces/tasks/i-tasks';
import { PriorityPipe } from '../../pipes/priority/priority.pipe';
import { ModalService } from '../../services/modal/modal.service';
import { PopupService } from '../../services/popup/popup.service';
import { TasksService } from '../../services/tasks/tasks.service';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  let tasksService: TasksService;
  let popupService: PopupService;
  let modalService: ModalService;

  const testItem1: ITasks = {
    id: 1,
    name: 'test',
    category: 'none',
    priority: 0,
    date: '',
    status: false,
    description: '',
  };

  const testItem2: ITasks = {
    id: 2,
    name: 'test',
    category: 'none',
    priority: 2,
    date: '',
    status: false,
    description: '',
  };

  const mockTasksService = {
    get taskList(): BehaviorSubject<ITasks[]> {
      return new BehaviorSubject<ITasks[]>([testItem1, testItem2]);
    },
    toggleStatus(id: number) {},
    sort(option: ISorting) {},
  };

  const mockPopupService = jasmine.createSpyObj(['setEditItem']);
  mockPopupService.setEditItem.and.callFake((item: ITasks) => {});

  const mockModalService = jasmine.createSpyObj(['setDeleteTask']);
  mockModalService.setDeleteTask.and.callFake((item: ITasks) => {});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: TasksService, useValue: mockTasksService },
        { provide: PopupService, useValue: mockPopupService },
        { provide: ModalService, useValue: mockModalService },
      ],
      declarations: [TableComponent, ResizeDirective, PriorityPipe],
    }).compileComponents();

    tasksService = TestBed.inject(TasksService);
    popupService = TestBed.inject(PopupService);
    modalService = TestBed.inject(ModalService);

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockPopupService.setEditItem.calls.reset();
    mockModalService.setDeleteTask.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tasks[0] => must be equal testItem1', () => {
    expect(component.tasks[0]).toEqual(testItem1);
  });

  it('editItem() => search native el .btn-edit, then call setEditItem(item)', () => {
    const butt = fixture.debugElement.query(By.css('button.btn-edit'));
    butt.nativeElement.click();
    expect(mockPopupService.setEditItem).toHaveBeenCalled();
    expect(mockPopupService.setEditItem).toHaveBeenCalledTimes(1);
  });

  it('deleteItem() => search native el .btn-delete, then call setDeleteTask(item)', () => {
    const butt = fixture.debugElement.query(By.css('button.btn-delete'));
    butt.nativeElement.click();
    expect(mockModalService.setDeleteTask).toHaveBeenCalled();
    expect(mockModalService.setDeleteTask).toHaveBeenCalledTimes(1);
  });

  it('completeItem() => search native el .btn-complete, then call toggleStatus(id)', () => {
    const event = spyOn(tasksService, 'toggleStatus').and.callFake(
      (id: number) => {}
    );
    event.calls.reset();

    const butt = fixture.debugElement.query(By.css('button.btn-complete'));
    butt.nativeElement.click();
    expect(event).toHaveBeenCalled();
    expect(event).toHaveBeenCalledTimes(1);
  });

  it('toggleFilter() => search native el .btn-complete, then call sort(param)', () => {
    const event = spyOn(tasksService, 'sort').and.callFake(
      (option: ISorting) => {}
    );
    event.calls.reset();

    const butt = fixture.debugElement.query(By.css('#btn-filter-0'));
    butt.nativeElement.click();
    expect(event).toHaveBeenCalled();
    expect(event).toHaveBeenCalledTimes(1);
  });
});
