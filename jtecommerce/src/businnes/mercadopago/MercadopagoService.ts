import { Log, LogManager } from '@muzzatech/log';
import { MercadopagotDAO,MerdadopagoEntity } from '../mercadopago';


export class MercadopagoService {
  private _dao: MercadopagotDAO;
  private _log: Log;

  constructor(MPDAO: MercadopagotDAO) {
    this._dao = MPDAO;
    this._log = LogManager.get('MercadopagoService');
  }
  async insertSale(entity:MerdadopagoEntity[]): Promise<MerdadopagoEntity[]> {

    for(let v of entity){
    const result = await this._dao.insert(v);

    const dbUpdate = await this._dao.update(v,v.prodSku)
    }
    return entity;
   }
}