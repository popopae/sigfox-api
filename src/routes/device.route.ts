import { Router } from 'express';
import DeviceController from '@controllers/device.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateDeviceDto } from '@/dtos/payload/device/createDevice.dto';

class DeviceRoute implements Routes {
  public path = '/device';
  public router = Router();
  public controller = new DeviceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/type/get`, this.controller.getListDeviceType);
    this.router.get(`${this.path}/get`, this.controller.getListDevice);
    this.router.post(`${this.path}/add`, validationMiddleware(CreateDeviceDto, 'body', true), this.controller.createDevice);
    this.router.get(`${this.path}`, this.controller.index);
  }
}

export default DeviceRoute;
