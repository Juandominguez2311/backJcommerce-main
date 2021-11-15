import { SQL } from './SQL';
import { Log as Logger, LogManager } from '@muzzatech/log';

const Log: Logger = LogManager.get('DB Manager');

class DBManager {
  private _sql!: SQL;

  define(instance: SQL): void {
    Log.info(`Connection Selected -> ${instance.name}`);
    this._sql = instance;
  }

  async checkConnection(): Promise<void> {
    try {
      Log.info(`Check Connection`);
      await this.get().runQuery(`SELECT 1`, []);
      Log.info(`Connection Successfully`);
    } catch (error) {
      Log.error(error);
      throw error;
    }
  }

  get(): SQL {
    if (!this._sql) {
      Log.error(`Please define connection, use DBManager.define method`);
      throw new Error('Connection Error');
    }
    return this._sql;
  }
}

const i: DBManager = new DBManager();
export { i as DBManager };
