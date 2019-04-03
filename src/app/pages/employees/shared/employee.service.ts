import { Injectable } from '@angular/core';

import { AlertService } from './../../../shared/components/alert-message/alert.service';
import { BaseEntityService } from 'src/app/shared/services/base-entity.service';
import { PostService } from '../../posts/shared/post.service';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseEntityService<Employee> {

  constructor(
    private alertService: AlertService,
    private postService: PostService
    ) {
    super();
  }

  protected localStorageKey(): string {
    return 'employees';
  }

  public getEmployeeByUsername(username: string): Employee {
    const employees: Employee[] = this.getAll().filter(employee => {
      return employee.username === username;
    });

    return (employees && employees.length > 0) ? employees[0] : null;
  }

  public getEmployeeByPhone(phone: string): Employee {
    const employees: Employee[] = this.getAll().filter(employee => {
      return employee.phone === phone;
    });

    return (employees && employees.length > 0) ? employees[0] : null;
  }

  public addRecord(employee: Employee): boolean {
    // If there is no other employee with the same phone or username
    if (!this.getAll().some(e => e.phone === employee.phone || e.username === employee.username)) {
      return super.addRecord(employee);
    } else {
      this.alertService.showErrorMessage('This phone number is already in use!');
    }

    return false;
  }

  public editRecord(employee: Employee): boolean {
    // If there is no other employee with the same phone or username
    if (!this.getAll().some(e => (e.phone === employee.phone || e.username === employee.username) && e.id !== employee.id)) {

      // If we are editing, we check before if we changed the @username or the #phone so we can replace it in the posts
      const oldEmployee: Employee = this.get(employee.id);
      const changedFields: any = {
        username: {
          old: '',
          new: ''
        },
        phone: {
          old: '',
          new: ''
        }
      };

      let hasChangedFields: boolean;
      if (employee.username !== oldEmployee.username) {
        changedFields.username.old = oldEmployee.username;
        changedFields.username.new = employee.username;
        hasChangedFields = true;
      }
      if (employee.phone !== oldEmployee.phone) {
        changedFields.phone.old = oldEmployee.phone;
        changedFields.phone.new = employee.phone;
        hasChangedFields = true;
      }

      // Update the employee
      super.editRecord(employee);

      if (hasChangedFields) {
        this.postService.updatePostsEmployeeInfo(changedFields);
      }

      return true;
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
