import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EmployeeService } from './../shared/employee.service';
import { AlertService } from './../../../shared/components/alert-message/alert.service';
import { Employee } from './../shared/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Input() visible: boolean;
  @Input() formTitle: string;
  @Input() employee: Employee;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.employee = new Employee();
  }

  confirmEdit() {
    if (!this.employee.id) {
      if (this.employeeService.addRecord(this.employee)) {
        this.alertService.showMessage('Employee created with success!');
      }
    } else {
      if (this.employeeService.editRecord(this.employee)) {
        this.alertService.showMessage('Employee edited with success!');
      }
    }

    this.close.emit();
  }

  cancelEdit() {
    this.close.emit();
  }

}
