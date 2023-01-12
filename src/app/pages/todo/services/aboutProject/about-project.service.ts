import { Injectable } from '@angular/core';
import { IInfoProject } from 'src/app/components/info-project/services/info-project/info-project.service';

@Injectable({
  providedIn: 'root',
})
export class AboutProjectService {
  constructor() {}

  public readonly about: IInfoProject[] = [
    {
      nameProject: 'список задач',
    },
    {
      title: 'стандартный функционал для todo листов',
      subtitle: ['создание', 'удаление', 'изменение', 'статус', 'сортировка'],
    },
    {
      title: 'валидация форм',
      subtitle: ['formControl', 'validator - (max,min)length, require'],
    },
    {
      title: 'реализованы приоритеты',
    },
    {
      title: 'реализованы категории',
      subtitle: ['добавление(с лимитом 24шт.)'],
    },
    {
      title: 'реализованы: пагинация, popup и модальные окна',
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
      subtitle: ['services', 'directives', 'formControl'],
    },
  ];
}
