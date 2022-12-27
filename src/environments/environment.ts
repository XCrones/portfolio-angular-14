// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { firabseConfig } from './firebase-config';

export interface IProjectItem {
  title: string;
  link: string;
}

export interface IFrameworks {
  react: IProjectItem;
  angular: IProjectItem;
}

export interface IProjects {
  todo: string;
  shop: string;
  chat: string;
}

interface IContactItem {
  title: string;
  link: string;
  localLink: string;
}

export interface IContacts {
  github: IContactItem;
  gmail: IContactItem;
  telegram: IContactItem;
  hh: IContactItem;
  skype: IContactItem;
}

const URL_FRAMEWORKS: IFrameworks = {
  angular: {
    title: 'angular',
    link: 'https://any-dea-angular.web.app',
  },
  react: {
    title: 'react',
    link: 'https://anydea-react.web.app',
  },
};

const URL_GIT_PROJECTS: IProjects = {
  todo: 'https://github.com/XCrones/portfolio-angular-14/tree/main/src/app/modules/todo',
  shop: 'https://github.com/XCrones/portfolio-angular-14/tree/main/src/app/modules/shop',
  chat: 'https://github.com/XCrones/portfolio-angular-14/tree/main/src/app/modules/chat',
};

const URL_CONTACTS: IContacts = {
  github: {
    title: 'github',
    link: 'https://github.com/XCrones/portfolio-angular-14',
    localLink: 'XCrones',
  },
  gmail: {
    title: 'gmail',
    link: 'mailto:Lymar.Serjey@gmail.com',
    localLink: 'Lymar.Serjey@gmail.com',
  },
  telegram: {
    title: 'telegram',
    link: 'https://t.me/LymarSerjey',
    localLink: '@LymarSerjey',
  },
  hh: {
    title: 'hh',
    link: 'https://hh.ru/resume/0b952de7ff081a79d00039ed1f734d70356a78?from=share_ios',
    localLink:
      'https://hh.ru/resume/0b952de7ff081a79d00039ed1f734d70356a78?from=share_ios',
  },
  skype: {
    title: 'skype',
    link: 'skype:Lymar.Serjey@gmail.com?userinfo',
    localLink: 'Lymar.Serjey@gmail.com',
  },
};

export const environment = {
  production: false,
  firebase: firabseConfig,
  URL_FRAMEWORKS,
  URL_GIT_PROJECTS,
  URL_CONTACTS,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
