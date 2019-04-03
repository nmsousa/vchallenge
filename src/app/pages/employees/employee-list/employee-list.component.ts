import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Employee } from './../shared/employee.model';
import { EmployeeService } from './../shared/employee.service';
import { AlertService } from './../../../shared/components/alert-message/alert.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  subscription: Subscription;
  employees: Employee[];
  selectedEmployee: Employee;
  deletingId: number;
  showModal: boolean;
  deleting: boolean;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.employees = this.employeeService.getAll(true);

    // Listen to Employee list changes
    this.subscription = this.employeeService.getRecordsChange().subscribe(employees => {
      this.employees = employees;
    });
  }

  createEmployee() {
    this.selectedEmployee = new Employee();
    this.showModal = true;
  }

  onEditEmployee(employee: Employee) {
    this.selectedEmployee = Object.assign({}, employee); // Clone to avoid changing the original instance
    this.showModal = true;
  }

  onDeleteEmployee(employee: Employee) {
    this.employeeService.deleteRecord(this.deletingId);
    this.alertService.showMessage('Employee deleted with success!');
    this.deleting = false;
  }

}
