import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoginComponent} from "./login.component";
import {AlertModule} from "ngx-bootstrap";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
],
  exports: [
    LoginComponent,

  ],
})
export class LoginAppModule {}
