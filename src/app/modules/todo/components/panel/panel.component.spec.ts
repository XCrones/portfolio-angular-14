import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';
import { BoxNeonDirective } from 'src/app/modules/ui/box-neon/box-neon.directive';
import { NeonService } from 'src/app/services/neon/neon.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { IModal } from '../../interfaces/modal/i-modal';
import { ITasks } from '../../interfaces/tasks/i-tasks';
import { ModalService } from '../../services/modal/modal.service';
import { PopupService } from '../../services/popup/popup.service';
import { TasksService } from '../../services/tasks/tasks.service';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  let shadowService: ShadowService;
  let neonService: NeonService;
  let tasksService: TasksService;
  let popupService: PopupService;
  let modalService: ModalService;

  const testColorShadowBox = 'test color';
  const testGlobalDelete: IModal = {
    isGlobal: true,
    id: -1,
    title: '',
  };

  const mockShadowService = jasmine.createSpyObj(['getBoxNeon']);
  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  const mockPopupService = jasmine.createSpyObj(['createNew']);
  const mockModalService = jasmine.createSpyObj(['setDeleteTask']);

  mockShadowService.getBoxNeon.and.returnValue(testColorShadowBox);
  mockNeonService.isEnable.and.returnValue(true);
  mockPopupService.createNew.and.callFake(() => {});

  const testItem1: ITasks = {
    id: 4,
    name: 'сходить на брусья',
    category: 'спорт',
    priority: 2,
    date: '2022-08-03',
    status: false,
    description: 'отжиматься на брусьях',
  };

  const testItem2: ITasks = {
    id: 5,
    name: 'сходить на брусья',
    category: 'спорт',
    priority: 2,
    date: '2022-08-03',
    status: true,
    description: 'отжиматься на брусьях',
  };

  const mockTasksService = {
    toggleStatus(itemId: number, isGlobal?: boolean, statusGlobal?: boolean) {},
    get taskList(): BehaviorSubject<ITasks[]> {
      return new BehaviorSubject<ITasks[]>([testItem1, testItem2]);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ShadowService, useValue: mockShadowService },
        { provide: NeonService, useValue: mockNeonService },
        { provide: TasksService, useValue: mockTasksService },
        { provide: PopupService, useValue: mockPopupService },
        { provide: ModalService, useValue: mockModalService },
      ],
      declarations: [PanelComponent, BoxNeonDirective],
    }).compileComponents();

    tasksService = TestBed.inject(TasksService);

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockShadowService.getBoxNeon.calls.reset();
    mockNeonService.isEnable.calls.reset();
    mockPopupService.createNew.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createNew() => call after click btn-create', () => {
    const butt = fixture.debugElement.query(By.css('button.btn-create'));
    butt.nativeElement.click();
    expect(mockPopupService.createNew).toHaveBeenCalled();
    expect(mockPopupService.createNew).toHaveBeenCalledTimes(1);
  });

  it('setDeleteTask() => call setDeleteTask(item) after click btn-delete', () => {
    const butt = fixture.debugElement.query(By.css('button.btn-delete'));
    butt.nativeElement.click();
    expect(mockModalService.setDeleteTask).toHaveBeenCalledWith(
      testGlobalDelete
    );
    expect(mockModalService.setDeleteTask).toHaveBeenCalledTimes(1);
  });

  it('completeAll() => call toggleStatus(...args) after click btn-complete', () => {
    const eventToggleStatus = spyOn(tasksService, 'toggleStatus').and.callFake(
      (itemId: number, isGlobal?: boolean, statusGlobal?: boolean) => {}
    );
    eventToggleStatus.calls.reset();

    const butt = fixture.debugElement.query(By.css('button.btn-complete'));
    butt.nativeElement.click();

    expect(eventToggleStatus).toHaveBeenCalledWith(-1, true, true);
    expect(eventToggleStatus).toHaveBeenCalledTimes(1);
  });

  it('completeAll() => call toggleStatus(...args) after click btn-set', () => {
    const eventToggleStatus = spyOn(tasksService, 'toggleStatus').and.callFake(
      (itemId: number, isGlobal?: boolean, statusGlobal?: boolean) => {}
    );
    eventToggleStatus.calls.reset();

    const butt = fixture.debugElement.query(By.css('button.btn-set'));
    butt.nativeElement.click();

    expect(eventToggleStatus).toHaveBeenCalledWith(-1, true, false);
    expect(eventToggleStatus).toHaveBeenCalledTimes(1);
  });

  it('sumTasks() => must be return 2', async () => {
    expect(component.sumTasks()).toBe(2);
  });

  it('sumNokTasks() => must be return 1', () => {
    expect(component.sumNokTasks()).toBe(1);
  });

  it('sumOkTasks() => must be return 1', () => {
    expect(component.sumOkTasks()).toBe(1);
  });

  it('pctOkTasks() => must be return 50', () => {
    expect(component.pctOkTasks()).toBe(50);
  });

  it('pctNokTasks() => must be return 50', () => {
    expect(component.pctNokTasks()).toBe(50);
  });
});
