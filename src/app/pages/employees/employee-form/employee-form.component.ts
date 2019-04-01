import { Component, OnInit, Input } from '@angular/core';

import { EmployeeService } from './../shared/employee.service';
import { Employee } from './../shared/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Input() employee: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employee = new Employee();
  }

  onSubmit() {
    this.employeeService.addRecord(this.employee);
    this.employee = new Employee();
  }

}
