import { Router } from 'express';
import DeviceController from '@controllers/device.controller';
import { Routes } from '@interfaces/routes.interface';

class DeviceRoute implements Routes {
  public path = '/device';
  public router = Router();
  public controller = new DeviceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get`, this.controller.getDeviceType);
    this.router.get(`${this.path}`, this.controller.index);
  }
}

export default DeviceRoute;
