import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsService } from './services/contacts.service';

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, ClipboardModule, BrowserAnimationsModule],
  providers: [ContactsService],
})
export class ContactsModule {}
