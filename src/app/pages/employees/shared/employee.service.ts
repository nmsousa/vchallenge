import { Injectable } from '@angular/core';

import { AlertService } from './../../../shared/components/alert-message/alert.service';
import { BaseEntityService } from 'src/app/shared/services/base-entity.service';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseEntityService<Employee> {

  constructor(private alertService: AlertService) {
    super();
  }

  protected localStorageKey(): string {
    return 'employees';
  }

  public addRecord(employee: Employee): boolean {
    // If there is no other employ
    if (!this.getAll().some(e => e.phone === employee.phone)) {
      return super.addRecord(employee);
    } else {
      this.alertService.showErrorMessage('This phone number is already in use!');
    }

    return false;
  }

  public editRecord(employee: Employee): boolean {
    // If there is no other employ
    if (!this.getAll().some(e => e.phone === employee.phone && e.id !== employee.id)) {
      return super.editRecord(employee);
    } else {
      this.alertService.showErrorMessage('This phone number is already in use!');
    }

    return false;
  }

  /**
   * Order the employees by id descending
   * @param employees Employees to be ordered
   */
  protected sortRecords(employees: Employee[]): Employee[] {
    if (employees) {
      return employees.sort((a, b) => {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }

    return [];
  }

}
