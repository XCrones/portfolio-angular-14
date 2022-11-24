import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AboutMeService } from './services/about-me.service';
import { TextNeonModule } from '../ui/text-neon/text-neon.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, TextNeonModule, BrowserAnimationsModule],
  providers: [AboutMeService],
})
export class HomeModule {}
