import { Router } from 'express';
import SigFoxController from '@/controllers/sigfox.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateDeviceDto } from '@/dtos/payload/device/createDevice.dto';
import { UpdateDeviceDto } from '@/dtos/payload/device/updateDevice.dto';

class SigFoxRoute implements Routes {
  public path = '';
  public router = Router();
  public controller = new SigFoxController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get`, this.controller.getListDevice);
    this.router.post(`${this.path}/add`, validationMiddleware(CreateDeviceDto, 'body', true), this.controller.createDevice);
    this.router.post(`${this.path}/update/:id`, validationMiddleware(UpdateDeviceDto, 'body', true), this.controller.updateDevice);
    this.router.get(`${this.path}/remove/:id`, this.controller.removeDevice);
    this.router.get(`${this.path}/type/get`, this.controller.getListDeviceType);
  }
}

export default SigFoxRoute;
