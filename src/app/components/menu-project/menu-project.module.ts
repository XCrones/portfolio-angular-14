import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuProjectComponent } from './menu-project.component';
import { RotateModule } from 'src/app/directives/rotate/rotate.module';
import { TextNeonModule } from 'src/app/directives/text-neon/text-neon.module';
import { BoxNeonModule } from 'src/app/directives/box-neon/box-neon.module';

@NgModule({
  declarations: [MenuProjectComponent],
  imports: [CommonModule, RotateModule, TextNeonModule, BoxNeonModule],
  exports: [MenuProjectComponent],
})
export class MenuProjectModule {}
