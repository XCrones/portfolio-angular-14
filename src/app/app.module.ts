import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { NeonService } from './services/neon/neon.service';
import { ShadowService } from './services/shadow/shadow.service';
import { NavigationComponent } from './components/navigation/navigation.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { IconNeonPipe } from './pipes/iconNeon/icon-neon.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeModule } from './pages/home/home.module';
import { ProjectsModule } from './pages/projects/projects.module';
import { ContactsModule } from './pages/contacts/contacts.module';
import { Page404Component } from './pages/page404/page404.component';
import { BoxNeonModule } from './directives/box-neon/box-neon.module';
import { TextNeonModule } from './directives/text-neon/text-neon.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    IconNeonPipe,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProjectsModule,
    HomeModule,
    ContactsModule,
    BoxNeonModule,
    TextNeonModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [NeonService, ShadowService],
  bootstrap: [AppComponent],
})
export class AppModule {}
