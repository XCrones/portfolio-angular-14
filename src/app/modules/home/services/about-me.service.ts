import { Injectable } from '@angular/core';
import { AboutMe } from '../interfaces/about-me';
import { Skills } from '../interfaces/skills';

@Injectable({
  providedIn: 'root',
})
export class AboutMeService {
  constructor() {}

  private readonly _aboutMe: AboutMe = {
    title: 'frontend developer',
    frameWork: 'angular',
    greetings: 'привет, меня зовут Сергей!',
    whatIsThis:
      'данное портфолио демонстрирует мой уровень компетенции в web разработке.',
    search: [
      { about: 'моя цель: ', goal: 'поиск работы;' },
      { about: 'позиция: ', goal: 'frontend developer angular;' },
      { about: 'опыт работы: ', goal: '2 года;' },
    ],
    subtitle: 'буду рад вашим предложениям!',
  };

  private readonly _mySkills: Array<Skills> = [
    {
      title: 'уверенное знание HTML',
      img: 'html',
      about: [
        'семантическая вёрстка',
        'адаптивная вёрстка',
        'именование по БЭМ',
      ],
    },
    {
      title: 'уверенное знание CSS',
      img: 'css',
      about: ['flexbox', 'animation', 'SCSS(SASS)'],
    },
    {
      title: 'хорошее знание JS',
      img: 'js',
      about: ['ES6+', 'promise', 'SCSS(fetch)'],
    },
    {
      title: 'хорошее знание TS',
      img: 'ts',
      about: ['interfaces', 'types', 'OOP'],
    },
    {
      title: 'хорошее знание Angular',
      img: 'angular',
      about: ['RxJs', 'DI', 'Animations'],
    },
    {
      title: 'хорошее знание react.js',
      img: 'react',
      about: ['react-router, hooks', 'react-hook-form', 'unit-test'],
    },
    {
      title: 'хорошее знание redux',
      img: 'redux',
      about: ['RTK', 'reducers', 'async thunk'],
    },
    {
      title: 'хорошее знание Tailwind css',
      img: 'tailwind',
      about: ['Breakpoints', 'Flexbox/Grid', 'Transitions/Animation'],
    },
    {
      title: 'основы Webpack',
      img: 'webpack',
      about: [
        'установка loaders',
        'установка modules',
        'преобразование SASS/SCSS',
      ],
    },
    {
      title: 'знание на уровне auth/firestore',
      img: 'firebase',
      about: ['auth', 'firestore', 'database'],
    },
    {
      title: 'базовое управление пакетами',
      img: 'npm',
      about: ['install', 'remove', 'update'],
    },
    {
      title: 'базовое знание библиотеки',
      img: 'jquery',
      about: ['доступ к элементам/аттрибутам', 'цепочки методов', 'анимации'],
    },
    {
      title: 'базовое знание редактора',
      img: 'ps',
      about: ['свойства элементов', 'нарезка элементов', 'горячие клавиши'],
    },
    {
      title: 'базовое знание редактора',
      img: 'figma',
      about: ['свойства элементов', 'экспорт', 'горячие клавиши'],
    },
    {
      title: 'базовое знание GIT',
      img: 'git',
      about: ['push/pull', 'status, add, commit', 'checkout'],
    },
    {
      title: 'основы БЭМ',
      img: 'bem',
      about: ['html', 'css', 'js'],
    },
  ];

  public get mySkills(): Array<Skills> {
    return this._mySkills;
  }

  public get aboutMe(): AboutMe {
    return this._aboutMe;
  }
}
