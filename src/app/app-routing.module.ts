import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { Page404Component } from './pages/page404/page404.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ShopComponent } from './pages/shop/shop.component';
import { TodoComponent } from './pages/todo/todo.component';

export interface IRouterLinkItem {
  link: string;
  title: string;
}

interface IRouterLinks {
  home: IRouterLinkItem;
  projects: {
    link: string;
    title: string;
    children: {
      todo: IRouterLinkItem;
      shop: IRouterLinkItem;
      chat: IRouterLinkItem;
    };
  };
  contacts: IRouterLinkItem;
}

export const ROUTER_LINKS: IRouterLinks = {
  home: {
    link: '',
    title: 'главная',
  },
  projects: {
    link: 'projects',
    title: 'проекты',
    children: {
      todo: {
        link: 'todo',
        title: 'todo',
      },
      shop: {
        link: 'shop',
        title: 'shop',
      },
      chat: {
        link: 'chat',
        title: 'chat',
      },
    },
  },
  contacts: {
    link: 'contacts',
    title: 'контакты',
  },
};

const routes: Routes = [
  { path: ROUTER_LINKS.home.link, component: HomeComponent },
  {
    path: ROUTER_LINKS.projects.link,
    component: ProjectsComponent,
    children: [
      {
        path: ROUTER_LINKS.projects.children.todo.link,
        component: TodoComponent,
      },
      {
        path: ROUTER_LINKS.projects.children.shop.link,
        component: ShopComponent,
      },
      {
        path: ROUTER_LINKS.projects.children.chat.link,
        component: ChatComponent,
      },
    ],
  },
  { path: ROUTER_LINKS.contacts.link, component: ContactsComponent },
  {
    path: '**',
    pathMatch: 'full',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
