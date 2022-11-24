import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TextNeonDirective } from 'src/app/modules/ui/text-neon/text-neon.directive';
import { NeonService } from 'src/app/services/neon/neon.service';
import { PaginatorV2Service } from 'src/app/services/paginatorV2/paginatorV2.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';
import { ITasks } from '../../interfaces/tasks/i-tasks';
import { CategoriesService } from '../../services/categories/categories.service';
import { PopupService } from '../../services/popup/popup.service';
import { TasksService } from '../../services/tasks/tasks.service';
import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  let shadowService: ShadowService;
  let popupService: PopupService;
  let tasksService: TasksService;
  let categoriesService: CategoriesService;
  let paginatorV2Service: PaginatorV2Service;
  let neonService: NeonService;

  const mockShadowService = jasmine.createSpyObj(['getTextNeon']);

  const testItem1: ITasks = {
    id: 1,
    name: 'test name',
    category: 'none',
    priority: 0,
    date: '2022-14-11T10:38:298',
    status: false,
    description: 'test decripttion',
  };

  const testItem2: ITasks = {
    id: 1,
    name: 'test name',
    category: 'test category',
    priority: 0,
    date: '2022-14-11T10:38:298',
    status: false,
    description: 'test decripttion',
  };

  const mockPopupService = {
    get editItem(): BehaviorSubject<ITasks> {
      return new BehaviorSubject<ITasks>(testItem1);
    },
    close() {},
    saveItem(item: ITasks) {},
  };

  const mockTasksService = {
    get taskList(): BehaviorSubject<ITasks[]> {
      return new BehaviorSubject<ITasks[]>([testItem1, testItem2]);
    },
    getCategories(): string[] {
      return [];
    },
  };

  const mockCategoryService = jasmine.createSpyObj(['updateCategories']);

  const mockPaginatorV2Service = jasmine.createSpyObj([
    'init',
    'isEqualPage',
    'setCurrPage',
    'pages',
    'parse',
  ]);

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ShadowService, useValue: mockShadowService },
        { provide: PopupService, useValue: mockPopupService },
        { provide: TasksService, useValue: mockTasksService },
        { provide: CategoriesService, useValue: mockCategoryService },
        { provide: PaginatorV2Service, useValue: mockPaginatorV2Service },
        { provide: NeonService, useValue: mockNeonService },
      ],
      declarations: [PopupComponent, TextNeonDirective],
    }).compileComponents();

    shadowService = TestBed.inject(ShadowService);
    popupService = TestBed.inject(PopupService);
    tasksService = TestBed.inject(TasksService);
    categoriesService = TestBed.inject(CategoriesService);
    paginatorV2Service = TestBed.inject(PaginatorV2Service);
    neonService = TestBed.inject(NeonService);

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockCategoryService.updateCategories.calls.reset();
    mockNeonService.isEnable.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close() => search native el .btn-close, then call close()', () => {
    const event = spyOn(popupService, 'close').and.callFake(() => {});
    event.calls.reset();
    const butt = fixture.debugElement.query(By.css('button.btn-close'));
    butt.nativeElement.click();

    expect(event).toHaveBeenCalled();
    expect(event).toHaveBeenCalledTimes(1);
  });

  it('close() => search native el .btn-cancel, then call close()', () => {
    const event = spyOn(popupService, 'close').and.callFake(() => {});
    event.calls.reset();
    const butt = fixture.debugElement.query(By.css('button.btn-cancel'));
    butt.nativeElement.click();

    expect(event).toHaveBeenCalled();
    expect(event).toHaveBeenCalledTimes(1);
  });

  it('close() => search native el .btn-cancel, then call updateCategories()', () => {
    mockCategoryService.updateCategories.and.callFake(
      (arr: string[], categori: string) => {}
    );
    const butt = fixture.debugElement.query(
      By.css('button.btn-submit-category')
    );
    butt.nativeElement.click();

    expect(mockCategoryService.updateCategories).toHaveBeenCalledTimes(1);
  });

  it('close() => search native el .btn-cancel, then call saveItem(item)', () => {
    const event = spyOn(popupService, 'saveItem').and.callFake(
      (item: ITasks) => {}
    );
    event.calls.reset();

    const butt = fixture.debugElement.query(By.css('button.btn-submit'));
    butt.nativeElement.click();

    expect(event).toHaveBeenCalledTimes(1);
  });

  it('editItem and name form must be equal testItem.name and description', () => {
    expect(component.editItem.id).toEqual(testItem1.id);
    expect(String(component.itemForm.controls.name.value)).toEqual(
      testItem1.name
    );
    expect(String(component.itemForm.controls.description.value)).toEqual(
      testItem1.description
    );
  });

  it('setPriority(0|1|2) => editItem.priority must be 0|1|2', () => {
    const buttPriority0 = fixture.debugElement.query(
      By.css('button#setPriority0')
    );
    const buttPriority1 = fixture.debugElement.query(
      By.css('button#setPriority1')
    );
    const buttPriority2 = fixture.debugElement.query(
      By.css('button#setPriority2')
    );

    buttPriority0.nativeElement.click();
    expect(component.editItem.priority).toBe(0);

    buttPriority1.nativeElement.click();
    expect(component.editItem.priority).toBe(1);

    buttPriority2.nativeElement.click();
    expect(component.editItem.priority).toBe(2);
  });
});
