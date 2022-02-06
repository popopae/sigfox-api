import { IUplink } from '../interfaces/entity/uplink.interface';
import uplinkService from '../services/uplink.service';
import callBackService from '../services/callback.service';
import { NextFunction, Request, Response } from 'express';
import { ICallBack } from '../interfaces/entity/callback.interface';
import { UplinkDto } from '../dtos/payload/uplink/uplink.dto';
import { CallBack } from '../models/callback.model';

class UplinkController {
  public service = new uplinkService();
  public callBackService = new callBackService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAll: IUplink[] = await this.service.findAll();

      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public callBack = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uplinkData: UplinkDto = req.body;
      console.log(uplinkData);
      const data: ICallBack = {
        device_type_id: uplinkData.deviceTypeId,
        device_id: uplinkData.deviceId,
        callback_data: uplinkData.data,
        callback_status: 'success',
        created_date: new Date(),
      };
      console.log(data);
      const result: CallBack = await this.callBackService.createCallBack(data);

      res.status(200).json({ data: result, message: 'create success' });
    } catch (error) {
      next(error);
    }
  };
}

export default UplinkController;
