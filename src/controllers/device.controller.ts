import { HttpStatusCodeEnum } from '@/utils/enums/httpStatusEnum';
import { NextFunction, Request, Response } from 'express';
import { IDevice } from '../interfaces/entity/device.interface';
import deviceService from '../services/device.service';

class DeviceController {
  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const service = new deviceService();
      const findAll: IDevice[] = await service.findAll();

      res.status(HttpStatusCodeEnum.OK).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public findByDeviceCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deviceId = req.params.id;
      const service = new deviceService();
      const find: IDevice = await service.findByDeviceCode(deviceId);

      res.status(HttpStatusCodeEnum.OK).json({ data: find, message: 'find device' });
    } catch (error) {
      next(error);
    }
  };
}

export default DeviceController;
