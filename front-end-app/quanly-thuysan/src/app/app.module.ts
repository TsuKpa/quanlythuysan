import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent, LogoutDialog, NoticeDialog1} from './app.component';
import { IntroComponent } from './intro/intro.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { NoticeDialog, ProductComponent} from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NuoigiongComponent } from './gd/nuoigiong/nuoigiong.component';
import { NuoinglieuComponent } from './gd/nuoinglieu/nuoinglieu.component';
import { ChebienComponent } from './gd/chebien/chebien.component';
import { PhanphoiComponent } from './gd/phanphoi/phanphoi.component';
import { BanleComponent } from './gd/banle/banle.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NuoigiongDetailComponent } from './gd/nuoigiong/nuoigiong-detail/nuoigiong-detail.component';
import { NuoinglieuDetailComponent } from './gd/nuoinglieu/nuoinglieu-detail/nuoinglieu-detail.component';
import { ChebienDetailComponent } from './gd/chebien/chebien-detail/chebien-detail.component';
import { PhanphoiDetailComponent } from './gd/phanphoi/phanphoi-detail/phanphoi-detail.component';
import { BanleDetailComponent } from './gd/banle/banle-detail/banle-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxKjuaModule} from 'ngx-kjua';
import { SupportComponent } from './support/support.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    ProductComponent,
    ProductDetailComponent,
    NuoigiongComponent,
    NuoinglieuComponent,
    ChebienComponent,
    PhanphoiComponent,
    BanleComponent,
    NuoigiongDetailComponent,
    NuoinglieuDetailComponent,
    ChebienDetailComponent,
    PhanphoiDetailComponent,
    BanleDetailComponent,
    NotFoundComponent,
    NoticeDialog,
    NoticeDialog1,
    LogoutDialog,
    ProfileComponent,
    SupportComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    NgxKjuaModule,
    MatToolbarModule,
    NgxPaginationModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: APP_BASE_HREF, useValue : '/' }
  ],
  entryComponents: [
    NoticeDialog, NoticeDialog1, LogoutDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
