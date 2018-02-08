import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private hostUrl = 'http://localhost:8080/employee';
  employees;
  showEditBox = false;
  showAddBox = false;
  classes;
  modalEmployee = {id: '', firstName: '', lastName: '', age: '',years: '', department: '', usedTechnology: '', companyEntity: {id: '', name: ''}};
  error = false;
  errorMessage;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const url = `${this.hostUrl}/list`;
    // Make the HTTP request:
    this.http.get(url).subscribe(data => {
      // Read the result field from the JSON response.
      this.employees = data;
    });
  }

  openEditBox(employee) {
    this.showEditBox = true;
    this.classes = 'blurred';
    this.modalEmployee.id = employee.id;
    this.modalEmployee.firstName = employee.firstName;
    this.modalEmployee.lastName = employee.lastName;
    this.modalEmployee.age = employee.age;
    this.modalEmployee.years = employee.years;
    this.modalEmployee.department = employee.department;
    this.modalEmployee.usedTechnology = employee.usedTechnology;
    this.modalEmployee.companyEntity.name = employee.companyEntity.name;
  }

  openAddBox() {
    this.error = false;
    this.showAddBox = true;
    this.classes = 'blurred';
    this.modalEmployee.id = '';
    this.modalEmployee.firstName = '';
    this.modalEmployee.lastName = '';
    this.modalEmployee.age='';
    this.modalEmployee.years='';
    this.modalEmployee.department='';
    this.modalEmployee.usedTechnology='';
    this.modalEmployee.companyEntity.id = '';
    this.modalEmployee.companyEntity.name = '';
  }

  closeEditBox() {
    this.showEditBox = false;
    this.classes = '';
  }

  addEmployee() {
    const url = `${this.hostUrl}/add`;
    this.error = false;
    const body = this.modalEmployee;
    this.http.post(url, body).subscribe(data => {
        this.closeAddBox();
        this.refreshList();
      },
      err => {
        this.error = true;
        this.errorMessage = err.error.message;
      });
  }

  updateEmployee(id, updatedEmployee) {
    const body = {
      'id': id,
      'firstName': updatedEmployee.firstName,
      'lastName': updatedEmployee.lastName,
      'age': updatedEmployee.age,
      'years': updatedEmployee.years,
      'department': updatedEmployee.department,
      'usedTechnology': updatedEmployee.usedTechnology,
      'companyEntity': {
        'id': 1,
        'name': 'Fortech'
      }
    };
    this.http.put(this.hostUrl + id, body).subscribe(data => {
      this.closeEditBox();
      this.refreshList();
    });
  }

  deleteEmployee(id) {
    this.http.delete(this.hostUrl + id).subscribe(data => {
      this.closeEditBox();
      this.refreshList();
    });
  }

  deleteEmployeeDirect(id) {
    this.http.delete(this.hostUrl + id).subscribe(data => {
      this.refreshList();
    })
  }

  refreshList() {
    this.http.get(this.hostUrl).subscribe(data => {
      // Read the result field from the JSON response.
      this.employees = data;
    });
  }

  closeAddBox() {
    this.error = false;
    this.showAddBox = false;
    this.classes = '';
  }

  closeAlert() {
    this.error = false;
  }

}
