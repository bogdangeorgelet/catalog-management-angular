import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Customer } from './customer';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CustomerService {

  private jsonAndAuth = new RequestOptions({
    headers: new Headers({
      Authorization: JSON.parse(localStorage.getItem('Authorization')),
      'Content-Type': 'application/json'
    })
  });

  private auth = new Headers({
    Authorization: 
      JSON.parse(localStorage.getItem('Authorization'))
  });
  private customerUrl = 'http://localhost:8080/rest-service/customers';

  constructor(private http: Http) {}

  private static handleError(error: any): Promise<any> {
    console.log('An error has occured', error);
    return Promise.reject(error.message || error);
  }

  getCustomers(): Promise<Customer[]> {
    return this.http.get(this.customerUrl, { headers: this.auth })
      .toPromise()
      .then(response => response.json() as Customer[])
      .catch(CustomerService.handleError);
  }

  getCustomer(username: string): Promise<Customer> {
    const url = `${this.customerUrl}/${username}`;
    return this.http.get(url, { headers: this.auth })
      .toPromise()
      .then(response => response.json() as Customer)
      .catch(CustomerService.handleError);
  }

  deleteCustomer(username: string): Promise<void> {
    const url = `${this.customerUrl}/${username}`;
    return this.http.delete(url, {headers: this.auth })
      .toPromise()
      .then(resp => resp)
      .catch(CustomerService.handleError);
  }

  createCustomer(customer: Customer): Promise<Customer> {
    return this.http.post(this.customerUrl,
      JSON.stringify(customer), this.jsonAndAuth)
      .toPromise()
      .then(res => res.json() as Customer)
      .catch(CustomerService.handleError);
  }

  updateCustomer(customer: Customer, username: string): Promise<Customer> {
    const url = `${this.customerUrl}/${username}`;
    return this.http
      .put(url, JSON.stringify(customer), this.jsonAndAuth)
      .toPromise()
      .then(() => customer)
      .catch(CustomerService.handleError);
  }
}
