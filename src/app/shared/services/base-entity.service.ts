import { Subject, Observable } from 'rxjs';
import { BaseEntityModel } from 'src/app/shared/models/base-entity.model';

export abstract class BaseEntityService<T extends BaseEntityModel> {

  protected recordsChange = new Subject<T[]>();

  constructor() { }

  /**
   * To be overrided
   */
  protected localStorageKey(): string {
    return '';
  }

  public getAll(sort?: boolean): T[] {
    return sort ?
      this.sortRecords(JSON.parse(localStorage.getItem(this.localStorageKey())) || []) :
      (JSON.parse(localStorage.getItem(this.localStorageKey())) || []);
  }

  /**
   * Observable that will inform when the record list have been changed
   */
  public getRecordsChange(): Observable<T[]> {
    return this.recordsChange.asObservable();
  }

  /**
   * Adds a new record
   * @param record Record to add
   */
  public addRecord(record: T): boolean {
    record.id = this.getNextRecordId(); // Fill the id
    const records: T[] = this.getAll();

    records.push(record);

    // Updates the localStorage records with the new record
    this.updateRecords(records);

    return true;
  }

  /**
   * Edits an existing record
   * @param record Record to be edited
   */
  public editRecord(record: T): boolean {
    const records: T[] = this.getAll().map(recordItem => {
      // Loop though the records and replace the one with the same id we passing
      return recordItem.id !== record.id ? recordItem : record;
    });

    // Updates the localStorage with the list of the records without the deleted one
    this.updateRecords(records);

    return true;
  }

  /**
   * Deletes a record by its Id
   * @param recordId Identifies the record to be deleted
   */
  public deleteRecord(recordId: number): boolean {
    // Get all the records but the one we want to delete
    const records: T[] = this.getAll().filter(record => {
      return record.id !== recordId;
    });

    // Updates the localStorage with the list of the records without the deleted one
    this.updateRecords(records);

    return true;
  }

  /**
   * Update the localStorage records
   * @param records Records to save in the localStorage
   */
  protected updateRecords(records: T[]): void {
    localStorage.setItem(this.localStorageKey(), JSON.stringify(records));

    // Inform whoever has a list of records that there is a new list
    this.recordsChange.next(this.sortRecords(records));
  }

  /**
   * Gets the next available record Id based on the curent max + 1
   * @param records List of records to lookup for the next Id
   */
  private getNextRecordId(): number {
    const records: T[] = this.getAll();

    if (records && records.length > 0) {
      return Math.max(...records.map(record => record.id)) + 1;
    }

    return 1; // It's the first record
  }

  /**
   * To be overrided by specific services
   * @param records Records to be sorted
   */
  protected sortRecords(records: T[]): T[] {
    return records;
  }

}
