import { DBManager, SQL } from '../database';

export abstract class DAO<T> {
  private _connection: SQL;

  constructor() {
    this._connection = DBManager.get();
  }

  get connection(): SQL {
    return this._connection;
  }

  //abstract selectAll(): Promise<Array<T>>;
  //abstract selectByCategory(category:number): Promise<Array<T>>;
  //abstract selectById(id: number): Promise<Array<T>>;
  //abstract insert(entity: T): Promise<Array<T>>;
  //abstract update(entity: T,id:number): Promise<Array<T>>;
  abstract delete(entity: T,id:number): Promise<Array<T>>;
}
