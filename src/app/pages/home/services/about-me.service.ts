import { Injectable } from '@angular/core';

export interface Skills {
  about: Array<string>;
  img: string;
}

export interface AboutMe {
  title: string;
  frameWork: string;
  greetings: string;
  whatIsThis: string;
  search: ISearch[];
  subtitle: string;
}

interface ISearch {
  about: string;
  goal: string;
}

@Injectable({
  providedIn: 'root',
})
export class AboutMeService {
  constructor() {}

  private readonly _aboutMe: AboutMe = {
    title: 'frontend developer',
    frameWork: 'angular',
    greetings: 'привет, меня зовут Сергей, я занимаюсь web разработкой.',
    whatIsThis:
      'данное портфолио демонстрирует мой уровень компетенции в web разработке.',
    search: [
      { about: 'моя цель: ', goal: 'поиск работы;' },
      { about: 'позиция: ', goal: 'frontend developer angular;' },
    ],
    subtitle: 'буду рад вашим предложениям!',
  };

  private readonly _mySkills: Array<Skills> = [
    {
      img: 'html',
      about: [
        'изучил язык разметки HTML',
        'применял теги и атрибуты',
        'научился применять семантику',
      ],
    },
    {
      img: 'css',
      about: [
        'изучил каскадные таблицы стилей CSS',
        'научился стилизовать элементы',
        'научился применять flexbox',
      ],
    },
    {
      img: 'js',
      about: [
        'изучил язык javascript',
        'изучил навигацию по DOM',
        'применял promise, async/await',
      ],
    },
    {
      img: 'ts',
      about: [
        'изучил язык typescript',
        'научился использовать interfaces',
        'применял ООП',
      ],
    },
    {
      img: 'angular',
      about: [
        'изучил framework Angular',
        'научился внедрять зависимости',
        'применял services, RxJs',
      ],
    },
    {
      img: 'react',
      about: [
        'изучил библиотеку React.js',
        'применял принцип replace components',
        'научился использовать hooks',
      ],
    },
    {
      img: 'redux',
      about: [
        'изучил state manager Redux',
        'научился применять reducers',
        'применял async thunk',
      ],
    },
    {
      img: 'tailwind',
      about: [
        'изучил css framework TailwindCss',
        'научился применять Transitions/Animation',
        'применял Responsive Design',
      ],
    },
    {
      img: 'webpack',
      about: [
        'изучил основы Webpack',
        'научился устанавливать loaders/modules',
        'применял преобразование SASS/SCSS',
      ],
    },
    {
      img: 'firebase',
      about: [
        'изучил сервис Firebase',
        'научился внедрять Auth',
        'применял firestore database',
      ],
    },
    {
      img: 'git',
      about: [
        'изучил основы GIT',
        'применял push, pull',
        'применял status, add, commit',
      ],
    },
    {
      img: 'bem',
      about: [
        'изучил основы BEM-naming',
        'научился применять в вёрстке',
        'применял именование классов',
      ],
    },
    {
      img: 'npm',
      about: [
        'изучил базовые манипуляции NPM',
        'научился установке/удалению пакетов',
        'научился обновлеять пакеты',
      ],
    },
    {
      img: 'jquery',
      about: [
        'изучил основы библиотеки JQuery',
        'научился применять цепочки методов',
        'научился создавать анимации',
      ],
    },
    {
      img: 'ps',
      about: [
        'базовое понимание редактора',
        'нарезка элементов',
        'горячие клавиши',
      ],
    },
    {
      img: 'figma',
      about: ['базовое понимание редактора', 'свойства элементов', 'экспорт'],
    },
  ];

  public get mySkills(): Array<Skills> {
    return this._mySkills;
  }

  public get aboutMe(): AboutMe {
    return this._aboutMe;
  }
}
