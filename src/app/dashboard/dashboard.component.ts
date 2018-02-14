import { Component, OnInit } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees;
  showEmployeeInfo = false;
  classes;
  modalEmployee = {id: '', firstName: '', lastName: '', age: '',years: '', department: '', usedTechnology: '', companyEntity: {id: '', name: ''}};
  error = false;
  errorMessage;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8080/employee/list').subscribe(data => {
      this.employees = data;
    }); 
  }

  openInfoBox(employee) {
    console.log(employee.lastName);
    this.showEmployeeInfo = true;
    this.classes = 'blurred';
    this.modalEmployee.firstName = employee.firstName;
    this.modalEmployee.lastName = employee.lastName;
    this.modalEmployee.age = employee.age;
    this.modalEmployee.years = employee.years;
    this.modalEmployee.department = employee.department;
    this.modalEmployee.usedTechnology = employee.usedTechnology;
    this.modalEmployee.companyEntity.name = employee.companyEntity.name;
  }

  closeInfoBox() {
    this.showEmployeeInfo = false;
    this.classes = '';
  }

}
