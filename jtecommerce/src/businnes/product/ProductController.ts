/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { Log as Logger, LogManager } from '@muzzatech/log';
import { ProductDAO, ProductService } from '../product';
import { HTTP_STATUS } from '../../utils';
import { JTError } from '../../common';
import { Product } from '..';

const Log: Logger = LogManager.get('ProductController');

export class ProductController {
  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const service = new ProductService(new ProductDAO());
      const response = await service.getById(req.params);
      return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
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
  async getProductByCategory(req: Request, res: Response): Promise<Response> {
    try {
      const service = new ProductService(new ProductDAO());
      const response = await service.getByCategoryServ(req.params);
      return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
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
  async getProductByName(req: Request, res: Response): Promise<Response> {
    try {
      const service = new ProductService(new ProductDAO());
      const response = await service.getByName(req.params);
      return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
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
  async getAllProduct(req: Request, res: Response): Promise<Response> {
    try {
      const service = new ProductService(new ProductDAO());
      const response = await service.getAll();
      return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
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

  async createProduct(req: Request, res: Response): Promise<Response> {
    // Create a Customer
    const product = new Product({
    sku: req.body.sku,
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    description: req.body.description,    
    image: req.body.image,
    price: req.body.price,
  
    });

  Log.info("llego hasta aca");
  // Save Customer in the database
  try {
  const service = new ProductService(new ProductDAO());
  const response = await service.insertProduct(product)
  return res.status(HTTP_STATUS.OK).json(response);
  }catch (error) {
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
};

async updateProduct(req: Request, res: Response): Promise<Response> {
  
  try {
    const service = new ProductService(new ProductDAO());
    const id = Number.parseInt(req.params.product_id);
    const response = await service.updateProductServ(req.body,id)
    return res.status(HTTP_STATUS.OK).json(response);
    }catch (error) {
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

async deleteProduct(req: Request, res: Response): Promise<Response> {
  try {
    const service = new ProductService(new ProductDAO());
    const id = Number.parseInt(req.params.product_id);
    const response = await service.DeleteProductServ(req.body,id)
    return res.status(HTTP_STATUS.OK).json(response);
    }catch (error) {
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
}
