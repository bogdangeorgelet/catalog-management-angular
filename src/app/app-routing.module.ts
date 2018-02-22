import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'app-welcome-page',
    component: WelcomePageComponent
  },
  { 
    path: 'home', 
    component: HomeComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  {
    path:'app-user-login',
    component: UserLoginComponent
  },
  {
    path: 'app-main-page',
    component: MainPageComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
