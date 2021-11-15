import { LogManager } from '@muzzatech/log';
import { DAO } from '../../common';
import { Product } from './Product';

export class ProductDAO extends DAO<Product> {
  async selectAll(): Promise<Product[]> {
    const query = `SELECT * FROM product;`;
    const result = await this.connection.runQuery(query, []);
    return result;
  }

  async selectById(id: number): Promise<Product[]> {
    const query = `SELECT * FROM product WHERE product_id = ?;`;
    const result = await this.connection.runQuery(query, [id]);
    return result;
  }
  async selectByName(name: string): Promise<Product[]> {
    const query = `SELECT * FROM product WHERE name LIKE CONCAT('%',?,'%');`;
    const result = await this.connection.runQuery(query, [
      name
    ]);
    return result;
  }
  async selectByCategory(category: number): Promise<Product[]> {
    const categoria = category;
    const query = `SELECT * FROM product WHERE category = ?;`;
    const result = await this.connection.runQuery(query, [categoria]);
    return result;
    
  }
  async insert(entity: Product): Promise<Product[]> {
    const query = `INSERT INTO product (sku, name, category, quantity, description, image, price) VALUES (?,?,?,?,?,?,?) ;`;
    const result = await this.connection.runQuery(query, [
      entity.sku,
      entity.name,
      entity.category,
      entity.quantity,
      entity.description,      
      entity.image,
      entity.price,
    ]);
    const newProduct = await this.selectById(result.insertId);
    return newProduct;
  }

  async update(entity: Product,id:number): Promise<Product[]> {
    const idProducto = id
    const query = `UPDATE product set sku = ?, name = ?,category = ?, quantity = ?, description = ?, image = ?, price = ?, updated_at = ? WHERE product_id = ? ;`;
    const result = await this.connection.runQuery(query, [
      entity.sku,
      entity.name,
      entity.category,
      entity.quantity,
      entity.description,
      entity.image,
      entity.price,
      entity.updated_at,
      idProducto,
    ]);

    const newProduct = await this.selectById(result.insertId);
    return newProduct;
  }

  async delete(entity: Product,id:number): Promise<Product[]> {
    const query = `DELETE FROM product WHERE product_id = ? `;
    const result = await this.connection.runQuery(query, [id]);
    return result;
  }
}
