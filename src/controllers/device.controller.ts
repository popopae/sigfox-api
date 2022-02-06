import { NextFunction, Request, Response } from 'express';
import { IDevice } from '../interfaces/entity/device.interface';
import deviceService from '../services/device.service';

class DeviceController {
  public service = new deviceService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAll: IDevice[] = await this.service.findAll();

      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default DeviceController;
