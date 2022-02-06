import { IUplink } from '../interfaces/entity/uplink.interface';
import UplinkService from '../services/uplink.service';
import CallBackService from '../services/callback.service';
import { NextFunction, Request, Response } from 'express';
import { ICallBack } from '../interfaces/entity/callback.interface';
import { UplinkDto } from '../dtos/payload/uplink/uplink.dto';
import { CallBack } from '../models/callback.model';

class UplinkController {
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
      const data: ICallBack = {
        device_type_id: uplinkData.deviceTypeId,
        device_id: uplinkData.deviceId,
        callback_data: uplinkData.data,
        callback_status: 'success',
        created_date: new Date(),
      };
      const result: CallBack = await service.createCallBack(data);

      res.status(200).json({ data: result, message: 'create success' });
    } catch (error) {
      next(error);
    }
  };
}

export default UplinkController;
