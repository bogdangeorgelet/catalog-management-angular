import { Component, OnInit, Injectable } from '@angular/core';
import { Auth } from './auth';
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Http } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Headers } from '@angular/http/src/headers';
import { TemplateRef } from '@angular/core/src/linker/template_ref';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { Customer } from "../shop/admin/customer/customer";
import { CustomerService } from "../shop/admin/customer/customer.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  warning: any;


  ngOnInit(): void {
    localStorage.clear();
    localStorage.setItem('authenticated', "false");
  }

  auth: Auth;
  public addModal: BsModalRef;

  constructor(private http: Http, private router: Router,
    private modalService: BsModalService,
    private customerService: CustomerService) { }

  login(form: NgForm) {

    this.auth = form.value as Auth;

    localStorage.setItem('Authorization', JSON.stringify('Basic '
      + btoa(this.auth.username + ':' + this.auth.password)));

    localStorage.setItem('authenticated', "false");

    this.http.post('http://localhost:8080/login', {},
      {
        headers: new Headers({
          Authorization:
            JSON.parse(localStorage.getItem('Authorization'))
        })
      })
      .subscribe(resp => {
        localStorage.setItem('authenticated', "true");
        localStorage.setItem('username', this.auth.username);
        localStorage.setItem('password', this.auth.password);
        if (resp.json()[0].authority = "t") {
          localStorage.setItem("userIsAdmin", "true");
          this.router.navigate(["/shop/admin"]);
        } else if (resp.json()[0].authority == 'f') {
          localStorage.setItem('userIsCustomer', "true");
          this.router.navigate(['/shop/client']);
        }
      }, err => {
        this.warning();
        localStorage.removeItem('authenticated');
        localStorage.removeItem('userIsAdmin');
        localStorage.removeItem('userIsCustomer');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      });
  }

  openAdd(template: TemplateRef<any>) {
    this.addModal = this.modalService.show(template);
  }

  addCustomer(form: NgForm): any {
    let customer: Customer = form.value as Customer;
    console.log(customer.confirmPassword);

    if (!customer.fullName && !customer.username && !customer.password &&
      !customer.confirmPassword && !customer.phoneNumber && !customer.email &&
      !customer.address && customer.password != customer.confirmPassword) {
      this.fail();
      return console.log("Couldn't create");
    } else if (customer.confirmPassword === customer.password) {
      this.success();
      this.customerService.createCustomer(customer)
        .then(customer => {
          console.log("Created");
        }).then(customer => this.addModal.hide());
    }
  }

  refresh(): void {
    window.location.reload();
  }

  public alerts: any = [];

  public warn(): void {
    this.alerts.push({
      type: 'danger',
      msg: 'Wrong credentials! Username and/or Password are incorrect',
      timeout: 3000
    });
  }

  public success(): void {
    this.alerts.push({
      type: 'success',
      msg: 'Your account has been created',
      timeout: 3000
    });
  }

  public fail(): void {
    this.alerts.push({
      type: 'danger',
      msg: 'Your account has not been created',
      timeout: 3000
    });
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('authenticated').toString() === 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('userIsAdmin') !== null) {
      return true;
    } else {
      this.router.navigate(['/shop/client']);
      return false;
    }
  }
}
