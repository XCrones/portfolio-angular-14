import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NeonService } from 'src/app/services/neon/neon.service';

import { ContactsComponent } from './contacts.component';
import { IContacts } from './interfaces/i-contacts';
import { ContactsService } from './services/contacts.service';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let contactsService: ContactsService;
  let neonService: NeonService;

  const mockContactsService = {
    get contacts(): Array<IContacts> {
      return [
        {
          service: 'test service',
          img: 'hh',
          link: 'test link',
          localLink: 'test local link',
          nickName: 'test nickName',
        },
      ];
    },
  };

  const mockNeonService = jasmine.createSpyObj(['isEnable']);
  mockNeonService.isEnable.and.returnValue(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: ContactsService, useValue: mockContactsService },
        { provide: NeonService, useValue: mockNeonService },
      ],
      declarations: [ContactsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClipboardCopy(bool) => if called then isCopied = boool', () => {
    component.onClipboardCopy(true);
    expect(component.isCopied).toBeTruthy();
  });

  it('toggleLink(string) => called then activeLink = string if activeLink equal string, activeLink = ""', () => {
    const testLink = 'test link';
    component.toggleLink(testLink);
    expect(component.activeLink).toEqual(testLink);
    expect(component.isCopied).toBeFalsy();

    component.toggleLink(testLink);
    expect(component.activeLink).toEqual('');
    expect(component.isCopied).toBeFalsy();
  });

  it('contacts => ', () => {
    expect(component.contacts).not.toBeUndefined();
  });
});
