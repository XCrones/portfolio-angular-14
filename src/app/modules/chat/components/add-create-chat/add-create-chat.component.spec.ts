import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BoxNeonDirective } from 'src/app/modules/ui/box-neon/box-neon.directive';
import { NeonService } from 'src/app/services/neon/neon.service';
import { ShadowService } from 'src/app/services/shadow/shadow.service';

import { AddCreateChatComponent } from './add-create-chat.component';

describe('AddCreateChatComponent', () => {
  let component: AddCreateChatComponent;
  let fixture: ComponentFixture<AddCreateChatComponent>;
  let shadowService: ShadowService;
  let neonService: NeonService;

  const testColorShadowBox = 'test color';
  const testChatName = 'test chat name';

  const mockShadowService = jasmine.createSpyObj(['getBoxNeon']);
  mockShadowService.getBoxNeon.and.returnValue(testColorShadowBox);

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddCreateChatComponent, BoxNeonDirective],
    }).compileComponents();

    shadowService = TestBed.inject(ShadowService);
    neonService = TestBed.inject(NeonService);

    fixture = TestBed.createComponent(AddCreateChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockShadowService.getBoxNeon.calls.reset();
    mockNeonService.isEnable.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('neonState() => must return true', () => {
    expect(component.neonState).toBeTruthy();
  });

  it('isCancel() => call after click btn-set then emit isCancel(void)', () => {
    const mock = spyOn(component.isCancel, 'emit');
    const butt = fixture.debugElement.query(By.css('button.btn-cancel'));
    butt.nativeElement.click();
    expect(mock).toHaveBeenCalled();
  });

  it('nameChat() => call after click btn-set then emit nameChat(string)', () => {
    component.nameForm.controls.name.setValue(testChatName);
    const mockNameChat = spyOn(component.nameChat, 'emit');
    mockNameChat.calls.reset();
    const butt = fixture.debugElement.query(By.css('button.btn-submit'));
    butt.nativeElement.click();
    expect(mockNameChat).toHaveBeenCalledWith(testChatName);
  });

  it('joinChat() => call after click btn-set then emit isJoinChat(string)', () => {
    component.responseErr = 'имя чата занято';
    fixture.detectChanges();
    component.nameForm.controls.name.setValue(testChatName);
    const mockIsJoinChat = spyOn(component.isJoinChat, 'emit');
    mockIsJoinChat.calls.reset();
    const butt = fixture.debugElement.query(By.css('button.btn-isjoin'));
    butt.nativeElement.click();
    expect(mockIsJoinChat).toHaveBeenCalledWith(testChatName);
  });

  it('createChat() => call after click btn-set then emit isCretaeChat(string)', () => {
    component.responseErr = 'чата не существует';
    fixture.detectChanges();
    component.nameForm.controls.name.setValue(testChatName);
    const mockIsCreateChat = spyOn(component.isCretaeChat, 'emit');
    mockIsCreateChat.calls.reset();
    const butt = fixture.debugElement.query(By.css('button.btn-iscreate'));
    butt.nativeElement.click();
    expect(mockIsCreateChat).toHaveBeenCalledWith(testChatName);
  });
});
