export default interface IGenericRepository<T> {
  getAll(nameApi: string): Promise<T[]>;
  getById(nameApi: string, id: number): Promise<T>;
  create(nameApi: string, item: T): Promise<T>;
  update(nameApi: string, id: number, item: T): Promise<T>;
  delete(nameApi: string, id: number): Promise<boolean>;
  count(
    nameApi: string,
    column: string,
    value: string,
    Operations: string
  ): Promise<number>;
}
