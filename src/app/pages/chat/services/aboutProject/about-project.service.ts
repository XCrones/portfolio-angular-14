import { Injectable } from '@angular/core';
import { IInfoProject } from 'src/app/components/info-project/interfaces/info-project/i-info-project';

@Injectable({
  providedIn: 'root',
})
export class AboutProjectService {
  readonly about: Array<IInfoProject> = [
    {
      nameProject: 'чат',
    },
    {
      title: 'в качестве сервера использовал Firebase',
      subtitle: ['auth-sign (in/up)', 'firestore', 'listner firestore'],
    },
    {
      title: 'валидация форм',
      subtitle: ['formGroup', 'validator - (max,min)length, require', 'email'],
    },
    {
      title: 'компоненты чата',
      subtitle: [
        'профиль',
        'выйти из чата',
        'создать чат',
        'присоединится к чату',
        'удаление сообщений(только своих)',
      ],
    },
    {
      title: 'стилизация',
      subtitle: ['tailwindcss'],
    },
    {
      title: 'из стороннего',
      subtitle: ['иконки bootstrap'],
    },
    {
      title: 'что применял',
      subtitle: ['services', 'pipes', 'rxjs'],
    },
  ];
  constructor() {}
}
