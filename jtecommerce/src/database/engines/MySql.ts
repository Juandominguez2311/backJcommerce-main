import { createPool, ConnectionOptions, PoolConnection } from 'mysql2/promise';
import { Log, LogManager } from '@muzzatech/log';
import { SQL } from '../SQL';

export class MySql implements SQL {
  private _config: ConnectionOptions;
  private _log: Log;
  private _name: string;

  constructor(config: ConnectionOptions) {
    this._name = 'MySql Connection';
    this._config = config;
    this._log = LogManager.get('MySql');
  }

  get name(): string {
    return this._name;
  }

  async createConnection(): Promise<PoolConnection> {
    this._log.info(`Creating connection`);
    const conn = createPool(this._config);
    return await conn.getConnection();
  }

  async runQuery(query: string, params: any[]): Promise<any> {
    const conn = await this.createConnection();
    this._log.info('Stablishing Connection');
    this._log.info(`Runner query -> ${query}`);
    try {
      const result = await conn.query(query, params);
      return result[0];
    } catch (error) {
      this._log.error(`Error on query: ${error}`);
      throw error;
    } finally {
      this._log.info(`-> Closering Connection`);
      await conn.release();
    }
  }
}
