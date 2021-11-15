import { Log, LogManager } from '@muzzatech/log';
import { Product, ProductDAO, ProductError } from '../product';

export class ProductService {
  private _dao: ProductDAO;
  private _log: Log;

  constructor(producDao: ProductDAO) {
    this._dao = producDao;
    this._log = LogManager.get('ProductService');
  }

  async getAll(): Promise<Array<Product>> {
    return await this._dao.selectAll();
  }
  async getById(payload: any): Promise<Product> {
    const id = payload.product_id;
    if (!id) {
      const message = 'id is neccessary';
      this._log.error(message);
      throw new ProductError(message);
    }

    const result = await this._dao.selectById(id);
    if (result.length > 1) {
      const message = `The id -> ${id} has ${result.length} register`;
      this._log.error(message);
      throw new ProductError(message);
    }
    return result[0];
  }
  async getByCategoryServ(data: any): Promise<Array<Product>> {
    return await this._dao.selectByCategory(data.category);
  }

 

  async getByName(data: any): Promise<Array<Product>>{

    return await this._dao.selectByName(data.name);
  }

  async insertProduct(entity:Product): Promise<Product> {
   const result = await this._dao.insert(entity);
   return result[0];
  }

  async updateProductServ(entity:Product,id:number): Promise<Product>{
    console.log(entity.product_id)
    const result = await this._dao.update(entity,id);
    return result[0];
  }
  async DeleteProductServ(entity:Product,id:number): Promise<Product>{
    console.log(entity.product_id)
    const result = await this._dao.delete(entity,id);
    return result[0];
  }
}
