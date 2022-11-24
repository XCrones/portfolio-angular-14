import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextNeonDirective } from './text-neon.directive';
import { ShadowService } from 'src/app/services/shadow/shadow.service';

@NgModule({
  declarations: [TextNeonDirective],
  imports: [CommonModule],
  exports: [TextNeonDirective],
  providers: [ShadowService],
})
export class TextNeonModule {}
