import { Router } from 'express';
import { Log, LogManager } from '@muzzatech/log';
import { MercadopagoController} from './MercadopagoController';
import { logAndConfigurePath, METHOD } from '../../utils';

enum MercadopagoPathRoute {
  payment = '/payment',
  feedback= '/payment/feedback'
}

export class MercadopagoRouter {
  private _log: Log;

  constructor() {
    this._log = LogManager.get('MercadoPagoRouter');
  }

  configure(router: Router): Router {
    const controller = new MercadopagoController();

    router.post(
      logAndConfigurePath(this._log, METHOD.POST, MercadopagoPathRoute.payment),
      controller.payment,
      
    ); 
    router.post(
        logAndConfigurePath(this._log, METHOD.POST, MercadopagoPathRoute.feedback),
        controller.feedback,
    );

    return router;

    
  }
}
