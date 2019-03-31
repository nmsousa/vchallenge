import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getEmployeeNames(): string[] {
    return ['aaa', 'bbb'];
  }

  getEmployeePhones(): string[] {
    return ['1234', '44556'];
  }

}
