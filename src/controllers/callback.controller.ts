import { IUplink } from '../interfaces/entity/uplink.interface';
import UplinkService from '../services/uplink.service';
import CallBackService from '../services/callback.service';
import { NextFunction, Request, Response } from 'express';
import { UplinkDto } from '../dtos/payload/callback/uplink.dto';
import { CallBack } from '../models/callback.model';
import { BidirDto } from '@/dtos/payload/callback/bidir.dto';

class CallBackController {
  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const service = new UplinkService();
      const findAll: IUplink[] = await service.findAll();

      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public callBack = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const service = new CallBackService();
      const uplinkData: UplinkDto = req.body;

      const result: CallBack = await service.createCallBack(uplinkData);

      res.status(200).json({ data: result, message: 'create success' });
    } catch (error) {
      next(error);
    }
  };

  public bidir = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const prefix: any = '{"{0}":{"downlinkData":"{1}"}}';
      const bidirData: BidirDto = req.body;

      const dataMapping: any = prefix.replace('{0}', bidirData.deviceId).replace('{1}', bidirData.data);
      const model: any = JSON.parse(dataMapping);

      res.status(200).json(model);
    } catch (error) {
      next(error);
    }
  };
}

export default CallBackController;
