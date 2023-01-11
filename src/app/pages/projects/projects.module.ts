import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProjectsService } from './services/projects/projects.service';

import { ProjectsComponent } from './projects.component';
import { ChatModule } from '../chat/chat.module';
import { ShopModule } from '../shop/shop.module';
import { TodoModule } from '../todo/todo.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    TodoModule,
    ShopModule,
    ChatModule,
    BrowserAnimationsModule,
  ],
  providers: [ProjectsService],
})
export class ProjectsModule {}
