import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { MenuProjectModule } from '../menu-project/menu-project.module';
import { InfoProjectModule } from '../info-project/info-project.module';
import { RoomComponent } from './components/room/room.component';
import { MessagesComponent } from './components/messages/messages.component';
import { BoxNeonModule } from '../ui/box-neon/box-neon.module';
import { TextNeonModule } from '../ui/text-neon/text-neon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutProjectService } from './services/aboutProject/about-project.service';
import { TimePipe } from './pipes/time/time.pipe';
import { ProfileService } from './services/profile/profile.service';
import { AuthModule } from '../auth/auth.module';
import { AddCreateChatComponent } from './components/add-create-chat/add-create-chat.component';
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
