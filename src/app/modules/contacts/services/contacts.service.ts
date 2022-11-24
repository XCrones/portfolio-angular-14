import { Injectable } from '@angular/core';
import { IContacts } from '../interfaces/i-contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor() {}

  private readonly _contacts: Array<IContacts> = [
    {
      service: 'gitHub',
      img: 'github',
      link: 'https://github.com/XCrones/portfolio-angular-14',
      localLink: 'XCrones',
      nickName: 'XCrones',
    },
    {
      service: 'gmail',
      img: 'gmail',
      link: 'mailto:Lymar.Serjey@gmail.com',
      localLink: 'Lymar.Serjey@gmail.com',
      nickName: 'Лымарь Сергей',
    },
    {
      service: 'telegram',
      img: 'telegram',
      link: 'https://t.me/LymarSerjey',
      localLink: '@LymarSerjey',
      nickName: 'Лымарь Сергей',
    },
    {
      service: 'hh',
      img: 'hh',
      link: 'https://hh.ru/resume/0b952de7ff081a79d00039ed1f734d70356a78?from=share_ios',
      localLink:
        'https://hh.ru/resume/0b952de7ff081a79d00039ed1f734d70356a78?from=share_ios',
      nickName: 'Лымарь Сергей',
    },
    {
      service: 'skype',
      img: 'skype',
      link: 'skype:Lymar.Serjey@gmail.com?userinfo',
      localLink: 'Lymar.Serjey@gmail.com',
      nickName: 'Лымарь Сергей',
    },
  ];

  public get contacts(): Array<IContacts> {
    return this._contacts;
  }
}
