import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  formdata;

  constructor(private router: Router) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      uname: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      passwd: new FormControl("", this.passwordValidation)
    });
  }

  passwordValidation(formControl) {
    if  (formControl.value.length < 5) {
      return {"passwd" : true};
    }
  }

  onClickSubmit(data) {
    console.log(data.uname);
    if  (data.uname === "systemadmin" && data.passwd == "admin123") {
      alert("Login Successful");
      this.router.navigate(['app-main-page']);
    } else {
      alert("Invalid Login");
      return false;
    }
  }

}
