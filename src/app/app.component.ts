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
export class AppComponent implements OnInit {

  employees;
  showEditBox = false;
  showAddBox = false;
  classes;
  modalEmployee = {id: '', firstName: '', lastName: '', companyEntity: {id: '', name: ''}};
  error = false;
  errorMessage;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('http://localhost:8080/employee/list').subscribe(data => {
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
    this.modalEmployee.companyEntity.name = employee.companyEntity.name;
  }

  openAddBox() {
    this.error = false;
    this.showAddBox = true;
    this.classes = 'blurred';
    this.modalEmployee.id = '';
    this.modalEmployee.firstName = '';
    this.modalEmployee.lastName = '';
    this.modalEmployee.companyEntity.id = '';
    this.modalEmployee.companyEntity.name = '';
  }

  closeEditBox() {
    this.showEditBox = false;
    this.classes = '';
  }

  addEmployee() {
    this.error = false;
    const body = this.modalEmployee;
    this.http.post('http://localhost:8080/employee/add', body).subscribe(data => {
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
      'companyEntity': {
        'id': 1,
        'name': 'Fortech'
      }
    };
    this.http.put('http://localhost:8080/employee/' + id, body).subscribe(data => {
      this.closeEditBox();
      this.refreshList();
    });
  }

  deleteEmployee(id) {
    this.http.delete('http://localhost:8080/employee/' + id).subscribe(data => {
      this.closeEditBox();
      this.refreshList();
    });

  }

  refreshList() {
    this.http.get('http://localhost:8080/employee/list').subscribe(data => {
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

