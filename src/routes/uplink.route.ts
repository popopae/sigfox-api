import { Router } from 'express';
import UplinkController from '@controllers/uplink.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';

class UplinkRoute implements Routes {
  public path = '/uplink';
  public router = Router();
  public controller = new UplinkController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}/type/get`, this.controller.getListDeviceType);
  }
}

export default UplinkRoute;
