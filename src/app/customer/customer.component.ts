import { Component, OnInit, Input } from '@angular/core';
import { Customer } from './customer';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }
  customers: Customer[] = [];
  selectedCustomer: Customer;
  @Input() city: string;
  ngOnInit() {
    this.customers = [
      { id: 1, firstName: 'Furkan', lastName: 'SARIHAN', age: 23 },
      { id: 2, firstName: 'Berkay', lastName: 'SARIHAN', age: 13 },
      { id: 3, firstName: 'Ayla', lastName: 'SARIHAN', age: 40 },
    ];
  }
  selectCustomer(customer: Customer) {
    this.selectedCustomer = customer;
  }

}
