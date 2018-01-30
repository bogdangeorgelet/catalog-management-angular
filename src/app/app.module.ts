import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MdTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { RouterModule} from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdTableModule,
    CdkTableModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      },
      {
        path:'app-user-login',
        component: UserLoginComponent
      },
      {
        path: 'app-main-page',
        component: MainPageComponent
      }
   ]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
