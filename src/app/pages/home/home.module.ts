import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AboutMeService } from './services/about-me.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextNeonModule } from 'src/app/directives/text-neon/text-neon.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, TextNeonModule, BrowserAnimationsModule],
  providers: [AboutMeService],
})
export class HomeModule {}
