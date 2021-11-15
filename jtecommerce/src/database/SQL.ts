export interface SQL {
  get name(): string;
  createConnection(...params: Array<any>): Promise<any>;
  runQuery(query: string, params: Array<any>): Promise<any>;
}
