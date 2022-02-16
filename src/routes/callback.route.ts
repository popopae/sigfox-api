import { Router } from 'express';
import CallBackController from '../controllers/callback.controller';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { UplinkDto } from '../dtos/payload/callback/uplink.dto';
import { BidirDto } from '@/dtos/payload/callback/bidir.dto';

class CallBackRoute implements Routes {
  public path = '/callback';
  public router = Router();
  public controller = new CallBackController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.findAll);
    this.router.get(`${this.path}/uplink/:id`, this.controller.getLastedUplink);
    this.router.post(`${this.path}/uplink`, validationMiddleware(UplinkDto, 'body', true), this.controller.callBack);
    this.router.post(`${this.path}/bidir`, validationMiddleware(BidirDto, 'body', true), this.controller.bidir);
  }
}

export default CallBackRoute;
