import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutProjectService } from './services/aboutProject/about-project.service';
import { TimePipe } from './pipes/time/time.pipe';
import { ProfileService } from './services/profile/profile.service';
import { RoomComponent } from 'src/app/components/chat/room/room.component';
import { MessagesComponent } from 'src/app/components/chat/messages/messages.component';
import { AddCreateChatComponent } from 'src/app/components/chat/add-create-chat/add-create-chat.component';
import { MenuProjectModule } from 'src/app/components/menu-project/menu-project.module';
import { InfoProjectModule } from 'src/app/components/info-project/info-project.module';
import { BoxNeonModule } from 'src/app/directives/box-neon/box-neon.module';
import { TextNeonModule } from 'src/app/directives/text-neon/text-neon.module';
import { AuthModule } from 'src/app/modules/auth/auth.module';

@NgModule({
  declarations: [
    ChatComponent,
    RoomComponent,
    MessagesComponent,
    TimePipe,
    AddCreateChatComponent,
  ],
  imports: [
    CommonModule,
    MenuProjectModule,
    InfoProjectModule,
    BoxNeonModule,
    TextNeonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
  ],
  providers: [AboutProjectService, ProfileService],
})
export class ChatModule {}
