import { MainRouter, Server } from './Server';
import { DBManager, MySql } from './database';
import {Mercadopago} from './service'
// TODO obetener esto por variable de entorno
const dbConfig = {
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'baa472f36902f9',
  database: 'heroku_60f95414a9aac64',
  connectionLimit: 10,
  password: '76ac25e8',
};

const MP_TOKEN = "TEST-2542444421814030-100413-1c3dc7c63b5b26d684cf736859bde849-144493226"

const main = async (): Promise<void> => {
  DBManager.define(new MySql(dbConfig));
  await DBManager.checkConnection();
  Mercadopago.configure(MP_TOKEN)
  const app = new MainRouter().configure(new Server());
  app.start();
};

main();
