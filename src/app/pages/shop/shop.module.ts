import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';

import { AboutProjectService } from './services/aboutProject/about-project.service';
import { PopupService } from './services/popup/popup.service';
import { ShopService } from './services/shop/shop.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { apiBaseUrl, API_BASE_URL } from './apiUrl';
import { fieldsDb, FIELDS_DB } from './fieldsDb';
import { PopupComponent } from 'src/app/components/shop/popup/popup.component';
import { HeaderComponent } from 'src/app/components/shop/header/header.component';
import { ProductsComponent } from 'src/app/components/shop/products/products.component';
import { CartComponent } from 'src/app/components/shop/cart/cart.component';
import { ProfileComponent } from 'src/app/components/shop/profile/profile.component';
import { PurchasesComponent } from 'src/app/components/shop/purchases/purchases.component';
import { ToolsComponent } from 'src/app/components/shop/header/tools/tools.component';
import { InfoProjectModule } from 'src/app/components/info-project/info-project.module';
import { MenuProjectModule } from 'src/app/components/menu-project/menu-project.module';
import { BoxNeonModule } from 'src/app/directives/box-neon/box-neon.module';
import { TextNeonModule } from 'src/app/directives/text-neon/text-neon.module';
import { AuthModule } from 'src/app/modules/auth/auth.module';

@NgModule({
  declarations: [
    ShopComponent,
    PopupComponent,
    HeaderComponent,
    ProductsComponent,
    CartComponent,
    ProfileComponent,
    PurchasesComponent,
    FilterPipe,
    ToolsComponent,
  ],
  imports: [
    CommonModule,
    InfoProjectModule,
    MenuProjectModule,
    BoxNeonModule,
    TextNeonModule,
    BrowserModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
  ],
  providers: [
    AboutProjectService,
    PopupService,
    ShopService,
    { provide: API_BASE_URL, useValue: apiBaseUrl },
    { provide: FIELDS_DB, useValue: fieldsDb },
  ],
})
export class ShopModule {}
