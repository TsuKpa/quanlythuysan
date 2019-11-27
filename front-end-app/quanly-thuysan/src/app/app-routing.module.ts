import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {NuoigiongComponent} from './gd/nuoigiong/nuoigiong.component';
import {NuoinglieuComponent} from './gd/nuoinglieu/nuoinglieu.component';
import {ChebienComponent} from './gd/chebien/chebien.component';
import {PhanphoiComponent} from './gd/phanphoi/phanphoi.component';
import {BanleComponent} from './gd/banle/banle.component';
import {NuoinglieuDetailComponent} from './gd/nuoinglieu/nuoinglieu-detail/nuoinglieu-detail.component';
import {ChebienDetailComponent} from './gd/chebien/chebien-detail/chebien-detail.component';
import {PhanphoiDetailComponent} from './gd/phanphoi/phanphoi-detail/phanphoi-detail.component';
import {BanleDetailComponent} from './gd/banle/banle-detail/banle-detail.component';
import {NuoigiongDetailComponent} from './gd/nuoigiong/nuoigiong-detail/nuoigiong-detail.component';
import {AuthGuardService} from './auth-guard.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProfileComponent} from './profile/profile.component';
import {SupportComponent} from './support/support.component';



const routes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full'},
  { path: 'intro', component: IntroComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'support', component: SupportComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'gd/ng/:id', component: NuoigiongComponent , canActivate: [AuthGuardService]},
  { path: 'gd/ng-detail/:id', component: NuoigiongDetailComponent },
  { path: 'gd/ngl/:id', component: NuoinglieuComponent , canActivate: [AuthGuardService]},
  { path: 'gd/ngl-detail/:id', component: NuoinglieuDetailComponent },
  { path: 'gd/cb/:id', component: ChebienComponent , canActivate: [AuthGuardService]},
  { path: 'gd/cb-detail/:id', component: ChebienDetailComponent },
  { path: 'gd/pp/:id', component: PhanphoiComponent , canActivate: [AuthGuardService]},
  { path: 'gd/pp-detail/:id', component: PhanphoiDetailComponent },
  { path: 'gd/bl/:id', component: BanleComponent , canActivate: [AuthGuardService]},
  { path: 'gd/bl-detail/:id', component: BanleDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
