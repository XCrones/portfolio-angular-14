import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IContacts } from '../interfaces/i-contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor() {}

  private readonly _contacts: Array<IContacts> = [
    {
      service: environment.URL_CONTACTS.github.title,
      img: 'github',
      link: environment.URL_CONTACTS.github.link,
      localLink: environment.URL_CONTACTS.github.localLink,
      nickName: 'XCrones',
    },
    {
      service: environment.URL_CONTACTS.gmail.title,
      img: 'gmail',
      link: environment.URL_CONTACTS.gmail.link,
      localLink: environment.URL_CONTACTS.gmail.localLink,
      nickName: 'Лымарь Сергей',
    },
    {
      service: environment.URL_CONTACTS.telegram.title,
      img: 'telegram',
      link: environment.URL_CONTACTS.telegram.link,
      localLink: environment.URL_CONTACTS.telegram.localLink,
      nickName: 'Лымарь Сергей',
    },
    {
      service: environment.URL_CONTACTS.hh.title,
      img: 'hh',
      link: environment.URL_CONTACTS.hh.link,
      localLink: environment.URL_CONTACTS.hh.localLink,
      nickName: 'Лымарь Сергей',
    },
    {
      service: environment.URL_CONTACTS.skype.title,
      img: 'skype',
      link: environment.URL_CONTACTS.skype.link,
      localLink: environment.URL_CONTACTS.skype.localLink,
      nickName: 'Лымарь Сергей',
    },
  ];

  public get contacts(): Array<IContacts> {
    return this._contacts;
  }
}
