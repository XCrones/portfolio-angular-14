import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';

import { InfoProjectModule } from '../info-project/info-project.module';
import { MenuProjectModule } from '../menu-project/menu-project.module';
import { PopupComponent } from './components/popup/popup.component';
import { AboutProjectService } from './services/aboutProject/about-project.service';
import { PopupService } from './services/popup/popup.service';
import { ShopService } from './services/shop/shop.service';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { BoxNeonModule } from '../ui/box-neon/box-neon.module';
import { TextNeonModule } from '../ui/text-neon/text-neon.module';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { AuthModule } from '../auth/auth.module';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { FormsModule } from '@angular/forms';
import { ToolsComponent } from './components/header/tools/tools.component';
import { BrowserModule } from '@angular/platform-browser';
import { apiBaseUrl, API_BASE_URL } from './apiUrl';
import { fieldsDb, FIELDS_DB } from './fieldsDb';

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
