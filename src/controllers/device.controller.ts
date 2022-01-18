import { ApiResponse } from '@/interfaces/payloads/api/apiResponse';
import { DeviceTypeResponse } from '@/interfaces/payloads/device/deviceTypeResponse';
import deviceService from '@/services/device.service';
import { NextFunction, Request, Response } from 'express';

class DeviceController {
  public deviceService = new deviceService();

  public getDeviceType = async (req: Request, res: Response): Promise<void> => {
    try {
      // const response: ApiResponse<DeviceTypeResponse> = {
      //   data: this.deviceService.getDeviceType(),
      //   isError: false,
      // };
      const result: DeviceTypeResponse = await this.deviceService.getDeviceType();
      const apiResponse: ApiResponse<DeviceTypeResponse> = {
        data: result,
        isError: false,
      };
      res.status(200).json(apiResponse);
    } catch (error) {
      const response: ApiResponse<any> = {
        data: error,
        isError: true,
      };
      res.status(400).json(response);
    }
  };

  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default DeviceController;
