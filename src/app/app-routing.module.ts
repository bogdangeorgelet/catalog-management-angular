import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/app-welcome-page', 
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
