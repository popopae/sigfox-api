import { Router } from 'express';
import deviceController from '@controllers/device.controller';
import { Routes } from '@interfaces/routes.interface';

class DeviceRoute implements Routes {
  public path = '/device';
  public router = Router();
  public controller = new deviceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.findAll);
  }
}

export default DeviceRoute;
