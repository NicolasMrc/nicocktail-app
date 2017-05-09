import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { BuilderComponent } from './builder/builder.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { BoxComponent } from './box/box.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RegistrationComponent } from './registration/registration.component';
import { SigninComponent } from './signin/signin.component';
import {UserService} from "../services/UserService";
import {AlcoholService} from "../services/AlcoholService";
import {SoftService} from "../services/SoftService";
import {ExtraService} from "../services/ExtraService";
import {BundleService} from "../services/BundleService";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {
  MdButtonModule, MdCheckboxModule, MdDialogModule, MdIconModule, MdInputModule, MdRadioButton, MdRadioModule,
  MdSidenavModule,
  MdSnackBarModule, MdTooltipModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogEditBundleComponent} from "./dialog/dialog-edit-bundle/dialog-edit-bundle.component";
import {DialogService} from "../services/DialogService";
import { DialogConfirmationComponent } from './dialog/dialog-confirmation/dialog-confirmation.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {AuthGuardService} from "../services/auth/auth-guard.service";
import {Hasher} from "../services/auth/hasher.service";
import { AdminComponent } from './admin/admin.component';
import { AdminAlcoholComponent } from './admin-alcohol/admin-alcohol.component';
import { AdminSoftComponent } from './admin-soft/admin-soft.component';
import { AdminExtraComponent } from './admin-extra/admin-extra.component';
import { AdminBundleComponent } from './admin-bundle/admin-bundle.component';
import { AdminUserComponent } from './admin-user/admin-user.component';


const appRoutes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'drink-box', component: BoxComponent },
  { path: 'builder', component: BuilderComponent },
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuardService],
        children: [
          { path: 'alcohol', component: AdminAlcoholComponent },
          { path: 'soft', component: AdminSoftComponent },
          { path: 'extra', component: AdminExtraComponent },
          { path: 'bundle', component: AdminBundleComponent },
          { path: 'user', component: AdminUserComponent },
        ]
      }
    ]
  },

];


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    BuilderComponent,
    CartComponent,
    HomeComponent,
    BoxComponent,
    WishlistComponent,
    RegistrationComponent,
    SigninComponent,
    DialogEditBundleComponent,
    DialogConfirmationComponent,
    HeaderComponent,
    AdminComponent,
    AdminAlcoholComponent,
    AdminSoftComponent,
    AdminExtraComponent,
    AdminBundleComponent,
    AdminUserComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdDialogModule,
    BrowserAnimationsModule,
    MdIconModule,
    MdSnackBarModule,
    MdRadioModule,
    MdTooltipModule,
    MdSidenavModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [
    UserService,
    AlcoholService,
    SoftService,
    ExtraService,
    BundleService,
    DialogService,
    AuthService,
    AuthGuardService,
    Hasher
  ],
  entryComponents:[
    DialogEditBundleComponent,
    DialogConfirmationComponent,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
