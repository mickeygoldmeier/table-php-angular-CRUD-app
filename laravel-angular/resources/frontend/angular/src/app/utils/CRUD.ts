/**
 * Interface for performing basic CRUD operations by services
 */
interface CRUD {
  /**
   * Create new object in the DB
   * @param obj the new object
   */
  create(obj: object): void

  /**
   * Get all records in the DB
   */
  read(): object[]

  /**
   * Update record in the DB
   * @param obj the updated record
   */
  update(obj: object): void

  /**
   * Delete a record from the DB
   * @param id the ID of the record to be deleted
   */
  delete(id: string): void
}

export {CRUD}
