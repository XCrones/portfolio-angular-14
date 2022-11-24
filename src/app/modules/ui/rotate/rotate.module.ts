import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotateDirective } from './rotate.directive';

@NgModule({
  declarations: [RotateDirective],
  imports: [CommonModule],
  exports: [RotateDirective],
})
export class RotateModule {}
