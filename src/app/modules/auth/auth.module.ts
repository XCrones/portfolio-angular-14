import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { TextNeonModule } from '../ui/text-neon/text-neon.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './services/auth/auth.service';
import { BoxNeonModule } from '../ui/box-neon/box-neon.module';

@NgModule({
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    BrowserModule,
    TextNeonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    HttpClientModule,
    BoxNeonModule,
  ],
  providers: [AuthService],
  exports: [AuthComponent],
})
export class AuthModule {}
