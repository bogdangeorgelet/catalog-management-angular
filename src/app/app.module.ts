import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginAppModule} from "./login/login.app.module";
import { EmployeeServiceService } from './employee-service.service';
import { LoginComponent, AuthGuard, AdminGuard } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { AdminComponent } from './shop/admin/admin.component';
import { ClientComponent } from './shop/client/client.component';
import { CustomerComponent } from './shop/admin/customer/customer.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    MainPageComponent,
    WelcomePageComponent,
    DashboardComponent,
    LoginComponent,
    ShopComponent,
    AdminComponent,
    ClientComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdTableModule,
    CdkTableModule,
    HttpClientModule,
    LoginAppModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [EmployeeServiceService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
