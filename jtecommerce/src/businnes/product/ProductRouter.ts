import { Router } from 'express';
import { Log, LogManager } from '@muzzatech/log';
import { ProductController } from '../product';
import { logAndConfigurePath, METHOD } from '../../utils';

enum ProductPathRoute {
  getById = '/product/:product_id',
  getAll = '/product',
  getByName ='/product/name/:name',
  getByCategory = '/product/category/:category',
  insertProduct='/product',
  updateProduct = '/product/:product_id',
  deleteProduct = '/product/:product_id',
}

export class ProductRouter {
  private _log: Log;

  constructor() {
    this._log = LogManager.get('ProductRouter');
  }

  configure(router: Router): Router {
    const controller = new ProductController();

    router.get(
      logAndConfigurePath(this._log, METHOD.GET, ProductPathRoute.getAll),
      controller.getAllProduct,
    );

    router.get(
      logAndConfigurePath(this._log, METHOD.GET, ProductPathRoute.getById),
      controller.getProductById,
    );
    router.get(
      logAndConfigurePath(this._log, METHOD.GET, ProductPathRoute.getByCategory),
      controller.getProductByCategory,
    );
    router.get(
      logAndConfigurePath(this._log, METHOD.GET, ProductPathRoute.getByName),
      controller.getProductByName,
    );
    
    router.post(
      logAndConfigurePath(this._log, METHOD.POST, ProductPathRoute.insertProduct),
    controller.createProduct,
      
    )
    router.put(
      logAndConfigurePath(this._log,METHOD.PUT, ProductPathRoute.updateProduct),
      controller.updateProduct,
    )
    router.delete(
      logAndConfigurePath(this._log,METHOD.DELETE, ProductPathRoute.deleteProduct),
      controller.deleteProduct,
    )


    return router;

    
  }
}
