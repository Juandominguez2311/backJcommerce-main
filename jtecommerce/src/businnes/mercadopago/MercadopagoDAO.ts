import { LogManager } from '@muzzatech/log';
import { DAO } from '../../common';
import {MerdadopagoEntity} from '../mercadopago'

export class MercadopagotDAO extends DAO<MerdadopagoEntity> {
  
  async insert(entity: MerdadopagoEntity): Promise<MerdadopagoEntity[]> {

    const query = `INSERT INTO sales (prodSku, prodName, prodPrice, prodQuantity) VALUES (?,?,?,?) ;`;
    const result = await this.connection.runQuery(query, [
      entity.prodSku,
      entity.prodName,
      entity.prodPrice,
      entity.prodQuantity
  
    ]);
    return result;
  }
  async update(entity: MerdadopagoEntity,sku:string): Promise<MerdadopagoEntity[]> {
    const quantityQuery = `SELECT quantity FROM product WHERE sku = ?;`;
    const resultquantity = await this.connection.runQuery(quantityQuery, [sku]);
    let quantityToUpdate = Number(resultquantity[0].quantity) - entity.prodQuantity
    const skuProducto = sku
    const query = `UPDATE product set quantity = ? WHERE sku = ?;`;
    const result = await this.connection.runQuery(query, [
      quantityToUpdate,
      skuProducto,
    ]);

    return result;
  }

  async delete(entity: MerdadopagoEntity,id:number): Promise<MerdadopagoEntity[]> {
    const query = `DELETE FROM product WHERE product_id = ? `;
    const result = await this.connection.runQuery(query, [id]);
    return result;
  }
}
