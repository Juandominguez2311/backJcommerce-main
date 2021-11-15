import { Router, Request, Response } from 'express';
import { Log, LogManager } from '@muzzatech/log';
import { ProductRouter, MercadopagoRouter } from '../../businnes';

import { Server } from '../Server';

export class MainRouter {
  private _router: Router;
  private _API_ENTRY;
  private _log: Log;

  constructor() {
    this._log = LogManager.get('Main Router');
    this._router = Router();
    this._API_ENTRY = '/api';
    this.routerConfigure();
  }

  private routerConfigure() {
    this._router.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'J&TECommerce' });
    });
    this._router.post('/products', (req: Request, res: Response) => {
      res.status(200).json({ message: 'J&TECommerce' });
    });
    
    this._log.info('Configure Product Router');
    this._router.use(
      this._API_ENTRY,
      new ProductRouter().configure(this._router),
    );
    this._router.use(
      this._API_ENTRY,
      new MercadopagoRouter().configure(this._router),
    )

    this._router.use('*', (req: Request, res: Response) => {
      res.status(400).json({ message: 'no esta' });
    });
  }

  configure(app: Server): Server {
    app.router = this._router;
    return app;
  }
}
