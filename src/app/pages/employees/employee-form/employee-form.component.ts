import { Component, OnInit } from '@angular/core';

import { EmployeeService } from './../shared/employee.service';
import { Employee } from './../shared/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = new Employee(1, 'username', 'name', 'role', 'phone');

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  onSubmit() {
    //this.employeeService.save(this.employee);
    //console.log(employee);
  }


}
