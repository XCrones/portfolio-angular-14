import { Injectable } from '@angular/core';
import { IInfoProject } from 'src/app/components/info-project/interfaces/info-project/i-info-project';

@Injectable({
  providedIn: 'root',
})
export class AboutProjectService {
  readonly about: Array<IInfoProject> = [
    {
      nameProject: 'fake shop',
    },
    {
      title: 'в качестве сервера использовал Firebase',
      subtitle: ['auth-sign (in/up)', 'firestore', 'listner firestore'],
    },
    {
      title: 'основано на Fake Store API',
    },
    {
      title: 'валидация форм',
      subtitle: ['formGroup', 'validator - (max,min)length, require', 'email'],
    },
    {
      title: 'компоненты магазина',
      subtitle: [
        'корзина',
        'аутентификация',
        'пагинация',
        'модальные окна',
        'профиль истории заказов',
      ],
    },
    {
      title: 'стилизация',
      subtitle: ['tailwindcss'],
    },
    {
      title: 'из стороннего',
      subtitle: ['иконки bootstrap', 'иконки materialize'],
    },
    {
      title: 'что применял',
      subtitle: ['services', 'directives', 'rxjs'],
    },
  ];

  constructor() {}
}
