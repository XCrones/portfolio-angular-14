import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxNeonDirective } from './box-neon.directive';

@NgModule({
  declarations: [BoxNeonDirective],
  imports: [CommonModule],
  exports: [BoxNeonDirective],
})
export class BoxNeonModule {}
