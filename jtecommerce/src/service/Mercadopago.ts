import mp from "mercadopago";
import { MercadoPago } from "mercadopago/interface";

export interface Items{
    sku:string,
    title:string,
    unit_price:number,
    quantity:number
}

export interface MpPayment{
   
    items: Array<Items>,
    back_urls:any,
    auto_return?:  "approved" | "all" ,
    //notification_url:string 
}


class Mercadopago {
    private _mp : MercadoPago;

    constructor(){
        this._mp = mp;
    }

    configure(token:string){

        this.mp.configure({
            access_token : token
        })

    }

    async payment(data : MpPayment):Promise<number>{
       try{ 
            const response = await this.mp.preferences.create(data)
            return response.body.id
          }
        catch(error){
            throw error
            
        }
    }

    private get mp(){
        return this._mp;
    }
}

const i: Mercadopago = new Mercadopago()
export{
    i as Mercadopago
}