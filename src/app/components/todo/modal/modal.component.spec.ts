import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '../../services/modal/modal.service';
import { IModal } from '../../interfaces/modal/i-modal';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;
  const mockModalService = {
    get dataDelete(): IModal {
      return {
        id: 0,
        isGlobal: false,
        title: testTitle,
      };
    },
    confirm(response: boolean) {},
  };

  const testTitle = 'testTitle';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: ModalService, useValue: mockModalService }],
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title() => must be return testTitle', () => {
    expect(component.title).toEqual(testTitle);
  });

  it('confirm() => search native el .btn-delete, then call confirm(true)', () => {
    const event = spyOn(modalService, 'confirm').and.callFake(
      (bool: boolean) => {}
    );
    event.calls.reset();
    const butt = fixture.debugElement.query(By.css('button.btn-delete'));
    butt.nativeElement.click();
    expect(mockModalService.confirm).toHaveBeenCalledWith(true);
    expect(mockModalService.confirm).toHaveBeenCalledTimes(1);
  });

  it('confirm() => search native el .btn-cancel, then call confirm(false)', () => {
    const event = spyOn(modalService, 'confirm').and.callFake(
      (bool: boolean) => {}
    );
    event.calls.reset();
    const butt = fixture.debugElement.query(By.css('button.btn-cancel'));
    butt.nativeElement.click();
    expect(mockModalService.confirm).toHaveBeenCalledWith(false);
    expect(mockModalService.confirm).toHaveBeenCalledTimes(1);
  });
});
