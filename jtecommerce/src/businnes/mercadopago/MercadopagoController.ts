/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { Log as Logger, LogManager } from '@muzzatech/log';
import { Mercadopago, MpPayment,Items} from '../../service'
import { HTTP_STATUS } from '../../utils';
import { JTError } from '../../common';
import {MercadopagoService, MercadopagotDAO,MerdadopagoEntity} from '../mercadopago'





const Log: Logger = LogManager.get('MercadopagoController');

export class MercadopagoController {
 async payment(req: Request, res: Response): Promise<Response>{
    try{
       console.log(req.body)
        const itemsRaw = req.body.items as Array<any>;  
        const items = itemsRaw.map<Items>((v)=>({

            quantity: +v.quantity,
            sku: v.prodSku,
            title: v.prodName,
            unit_price: +v.price


        }))
        console.log(items)
        const payload: MpPayment = {
            
            items: [
                
                ...items
                /*{
                sku: req.body.prodSku,
                title: req.body.prodName,
                unit_price: Number(req.body.unit_price), 
                quantity: Number(req.body.quantity)
                
            }*/],
            
            back_urls: {"success": "http://localhost:4200/payment/feedback/success",
                        "failure": "http://localhost:4200/payment/feedback/failure",
                        "pending": "http://localhost:4200"
                        },
            auto_return:"approved",
           // notification_url:"https://hookb.in/K3k1PyQOD6hPMK88MyKq"
          
        }
        
        const response = await Mercadopago.payment(payload)
        const service = new MercadopagoService(new MercadopagotDAO());
        
        const db = await service.insertSale(MerdadopagoEntity.create(req.body));
        return res.status(HTTP_STATUS.OK).json({id:response},);
    }
    catch(error){
        // @ts-ignore
        Log.error(error.message);
        
        // @ts-ignore
        let jtError: JTError = JTError.generateJTError(error.message);
        // @ts-ignore
        if (JTError.isJTError(error)) {
            jtError = error as JTError;
        }

        return res.status(jtError.status).json(jtError.messageError);
    }
}
async feedback(req: Request, res: Response): Promise<Response>{
    
    return res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
        
	});
    
}
}
