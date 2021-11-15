import { ProductError } from './ProductError';

export class Product {
  private _product_id?: number;
  private _sku: string;
  private _name: string;
  private _category: number;
  private _description: string;
  private _quantity: number;
  private _image?: string;
  private _price: number;
  private _created_at?: Date;
  private _updated_at?: Date;
  private _deleted_at?: Date;
  private _active?: boolean;

  get product_id(): number {
    return this._product_id!;
  }

  set sku(sku: string) {
    this._sku = sku;
  }

  get sku(): string {
    return this._sku;
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
  
  set category(category: number) {
    this._category = category;
  }

  get category(): number {
    return this._category;
  }
  set description(description: string) {
    this.description = description;
  }

  get description(): string {
    return this._description;
  }
  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  get quantity(): number {
    return this._quantity;
  }
  set image(image: string) {
    this._image = image;
  }

  get image(): string {
    return this._image!;
  }

  set price(price: number) {
    this._price = price;
  }

  get price(): number {
    return this._price;
  }

  get created_at(): Date {
    return this._created_at!;
  }

  get updated_at(): Date {
    return this._updated_at!;
  }

  get deleted_at(): Date {
    return this._deleted_at!;
  }

  get active(): boolean {
    return this._active!;
  }

  constructor(data: any) {
   // Product.isValid(data);
    this._product_id = data.product_id;
    this._sku = data.sku;
    this._name = data.name;
    this._category = data.category;
    this._description = data.description;
    this._quantity = data.quantity;
    this._image = data.image;
    this._price = data.price;
    this._created_at = data.created_at;
    this._updated_at = data.updated_at;
    this._deleted_at = data.deleted_at;
    this._active = data.active;
  }

  static isValid(data: any): void {
    const { sku, name,category,descption,quantity,image,price} = data;
    if (!sku || !name || !price || !category  || !quantity)
      throw new ProductError('Sku, Name, Category, quantity and Price on Product are needed');
  }
}
