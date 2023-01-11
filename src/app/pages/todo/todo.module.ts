import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';

import { PriorityPipe } from './pipes/priority/priority.pipe';
import { ResizeDirective } from './directives/resize/resize.directive';
import { ModalComponent } from 'src/app/components/todo/modal/modal.component';
import { PanelComponent } from 'src/app/components/todo/panel/panel.component';
import { PopupComponent } from 'src/app/components/todo/popup/popup.component';
import { TableComponent } from 'src/app/components/todo/table/table.component';
import { InfoProjectModule } from 'src/app/components/info-project/info-project.module';
import { MenuProjectModule } from 'src/app/components/menu-project/menu-project.module';
import { BoxNeonModule } from 'src/app/directives/box-neon/box-neon.module';
import { TextNeonModule } from 'src/app/directives/text-neon/text-neon.module';

@NgModule({
  declarations: [
    TodoComponent,
    ModalComponent,
    PanelComponent,
    PopupComponent,
    TableComponent,
    PanelComponent,
    ModalComponent,
    TableComponent,
    PopupComponent,
    ResizeDirective,
    PriorityPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfoProjectModule,
    MenuProjectModule,
    BoxNeonModule,
    TextNeonModule,
  ],
})
export class TodoModule {}
