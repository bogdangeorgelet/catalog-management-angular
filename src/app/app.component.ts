import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import {HttpClient} from '@angular/common/http';
import {tokenReference} from '@angular/compiler';
import { AppService } from './app-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

constructor(
  private app: AppService,
  private http: HttpClient,
  private router: Router
) {}

logout() {
  this.http.post('http://localhost:8080/logout', {}).finally(() => {
    this.app.authenticated = false;
    this.router.navigateByUrl("/login");
  }).subscribe();
}

}