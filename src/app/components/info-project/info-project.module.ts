import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoProjectComponent } from './info-project.component';
import { InfoProjectService } from './services/info-project/info-project.service';
import { TextNeonModule } from 'src/app/directives/text-neon/text-neon.module';

@NgModule({
  declarations: [InfoProjectComponent],
  imports: [CommonModule, TextNeonModule],
  providers: [InfoProjectService],
  exports: [InfoProjectComponent],
})
export class InfoProjectModule {}
