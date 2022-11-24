import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { ChatComponent } from './modules/chat/chat.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { HomeComponent } from './modules/home/home.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { ShopComponent } from './modules/shop/shop.component';
import { TodoComponent } from './modules/todo/todo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      { path: 'todo', component: TodoComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'chat', component: ChatComponent },
    ],
  },
  { path: 'contacts', component: ContactsComponent },
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
