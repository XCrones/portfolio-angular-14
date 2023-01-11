import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './services/auth/auth.service';
import { TextNeonModule } from 'src/app/directives/text-neon/text-neon.module';
import { BoxNeonModule } from 'src/app/directives/box-neon/box-neon.module';

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
