import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuProjectComponent } from './menu-project.component';
import { RotateModule } from '../ui/rotate/rotate.module';
import { TextNeonModule } from '../ui/text-neon/text-neon.module';
import { BoxNeonModule } from '../ui/box-neon/box-neon.module';

@NgModule({
  declarations: [MenuProjectComponent],
  imports: [CommonModule, RotateModule, TextNeonModule, BoxNeonModule],
  exports: [MenuProjectComponent],
})
export class MenuProjectModule {}
