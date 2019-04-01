import { BaseEntityModel } from 'src/app/shared/models/base-entity.model';

/**
 * This class represents an Employee
 */
export class Employee extends BaseEntityModel {

  constructor(
    public id?: number,
    public username?: string,
    public name?: string,
    public role?: string,
    public phone?: string
  ) {

    super();
  }

}
