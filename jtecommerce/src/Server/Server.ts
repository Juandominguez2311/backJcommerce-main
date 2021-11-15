import express, { Application, Router, json, urlencoded } from 'express';
import { LogManager, Log } from '@muzzatech/log';
import cors from 'cors';

export class Server {
  private _log: Log;
  private _app: Application;
  private _port: number;
  private _router!: Router;

  constructor() {
    this._log = LogManager.get('Server');
    this._app = express();
    this._port = 9099;
  }

  get port(): number {
    return this._port;
  }

  set router(router: Router) {
    this._router = router;
  }

  start(): void {
    this._app.use(json());
    this._app.use(urlencoded({ extended: false }));
    this._app.use(cors());
    this._app.use(this._router);
    this._app.listen(this.port);
    this._log.info(`Server Running on port ${this.port}`);
  }
}
