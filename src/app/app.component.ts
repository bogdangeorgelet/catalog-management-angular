import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {tokenReference} from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
<<<<<<< HEAD
  
=======
  title = "Welcome to Catalxog Management Application";
>>>>>>> 598d49a4bceaa207e3b01b3af5c8ded8b5b57c83
}

