export class MerdadopagoEntity {
    private _sale_id?: number;
    private _prodSku: string;
    private _prodName: string;
    private _prodQuantity: number;
    private _prodPrice: number;
  
  
    get sale_id(): number {
      return this._sale_id!;
    }
  
    set prodSku(prodSku: string) {
      this._prodSku = prodSku;
    }
  
    get prodSku(): string {
      return this._prodSku;
    }
    set prodName(prodName: string) {
        this._prodName = prodName;
      }
    
      get prodName(): string {
        return this._prodName;
      }
      set prodQuantity(prodQuantity: number) {
        this._prodQuantity = prodQuantity;
      }
    
      get prodQuantity(): number {
        return this._prodQuantity;
      }
      set prodPrice(prodPrice: number) {
        this._prodPrice = prodPrice;
      }
    
      get prodPrice(): number {
        return this._prodPrice;
      }
    
    
  
    constructor(data: any) {
     // Product.isValid(data);
      this._sale_id = data.sale_id ?? null;
      this._prodSku = data.sku;
      this._prodName = data.name;
      this._prodPrice = data.price;
      this._prodQuantity = data.quantity;
    
    }
  
    static create(data:any) : MerdadopagoEntity[]{
      let r : MerdadopagoEntity[] =[]
      for(let v of data.items){
        r =  [...r,  new MerdadopagoEntity(v)]
      }
    
      return r
     
    }
    
  }
  