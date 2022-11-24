import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { ModalComponent } from './components/modal/modal.component';
import { PanelComponent } from './components/panel/panel.component';
import { PopupComponent } from './components/popup/popup.component';
import { TableComponent } from './components/table/table.component';

import { InfoProjectModule } from '../info-project/info-project.module';
import { MenuProjectModule } from '../menu-project/menu-project.module';
import { BoxNeonModule } from '../ui/box-neon/box-neon.module';
import { TextNeonModule } from '../ui/text-neon/text-neon.module';
import { PriorityPipe } from './pipes/priority/priority.pipe';
import { ResizeDirective } from './directives/resize/resize.directive';

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
