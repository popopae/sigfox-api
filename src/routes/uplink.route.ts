import { Router } from 'express';
import UplinkController from '../controllers/uplink.controller';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { UplinkDto } from '../dtos/payload/uplink/uplink.dto';

class UplinkRoute implements Routes {
  public path = '/uplink';
  public router = Router();
  public controller = new UplinkController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.findAll);
    this.router.post(`${this.path}/callback`, validationMiddleware(UplinkDto, 'body', true), this.controller.callBack);
  }
}

export default UplinkRoute;
