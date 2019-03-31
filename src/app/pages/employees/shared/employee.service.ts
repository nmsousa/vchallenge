import { Injectable } from '@angular/core';

import { BaseEntityService } from 'src/app/shared/services/base-entity.service';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseEntityService<Employee> {

  constructor() {
    super();
  }

  protected localStorageKey(): string {
    return 'employees';
  }

  getEmployeeNames(): string[] {
    return ['aaa', 'bbb'];
  }

  getEmployeePhones(): string[] {
    return ['1234', '44556'];
  }

  /**
   * Order the posts by date descending
   * @param posts Employees to be ordered
   */
  protected sortRecords(posts: Employee[]): Employee[] {
    if (posts) {
      return posts.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }

    return [];
  }

}
