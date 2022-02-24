import { DataTableRequestDto } from '@/dtos/payload/datatable/dataTableRequest.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import deviceController from '../controllers/device.controller';
import { Routes } from '../interfaces/routes.interface';

class DeviceRoute implements Routes {
  public path = '/device';
  public router = Router();
  public controller = new deviceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.findAll);
    this.router.get(`${this.path}/:id`, this.controller.findByDeviceCode);
    this.router.post(`${this.path}/search`, validationMiddleware(DataTableRequestDto, 'body', true), this.controller.findByAdvanceSearch);
  }
}

export default DeviceRoute;
