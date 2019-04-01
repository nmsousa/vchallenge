import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Employee } from './../shared/employee.model';
import { EmployeeService } from './../shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  subscription: Subscription;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employees = this.employeeService.getAll(true);

    // Listen to Employee list changes
    this.subscription = this.employeeService.getRecordsChange().subscribe(employees => {
      this.employees = employees;
    });
  }

  onEdit() {

  }

  onDelete() {

  }

}
