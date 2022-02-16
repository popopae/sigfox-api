import { ApiResponse } from '../interfaces/payloads/api/apiResponse';
import { CreateDeviceRequest } from '../interfaces/payloads/device/createDeviceRequest';
import { CreateDeviceResponse } from '../interfaces/payloads/device/createDeviceResponse';
import { DeviceResponse } from '../interfaces/payloads/device/deviceResponse';
import { DeviceTypeResponse } from '../interfaces/payloads/device/deviceTypeResponse';
import { ActionDeviceResponse } from '../interfaces/payloads/device/actionDeviceResponse';
import SigFoxService from '../services/sigfox.service';
import { NextFunction, Request, Response } from 'express';
import { UpdateDeviceRequest } from '../interfaces/payloads/device/updateDeviceRequest';
import { HttpStatusCodeEnum } from '@/utils/enums/httpStatusEnum';

class SigFoxController {
  public getListDeviceType = async (req: Request, res: Response): Promise<void> => {
    try {
      const sigFoxService = new SigFoxService();
      const result: DeviceTypeResponse = await sigFoxService.getListDeviceType();
      const apiResponse: ApiResponse<DeviceTypeResponse> = {
        data: result,
        isError: false,
      };
      res.status(HttpStatusCodeEnum.OK).json(apiResponse);
    } catch (error) {
      const response: ApiResponse<any> = {
        data: error,
        isError: true,
      };
      res.status(HttpStatusCodeEnum.BadRequest).json(response);
    }
  };

  public getListDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const sigFoxService = new SigFoxService();
      const result: DeviceResponse = await sigFoxService.getListDevice();
      const apiResponse: ApiResponse<DeviceResponse> = {
        data: result,
        isError: false,
      };
      res.status(HttpStatusCodeEnum.OK).json(apiResponse);
    } catch (error) {
      const response: ApiResponse<any> = {
        data: error,
        isError: true,
      };
      res.status(HttpStatusCodeEnum.BadRequest).json(response);
    }
  };

  public createDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const sigFoxService = new SigFoxService();
      const request: CreateDeviceRequest = req.body;
      const result: CreateDeviceResponse = await sigFoxService.createDevice(request);
      const apiResponse: ApiResponse<CreateDeviceResponse> = {
        data: result,
        isError: false,
      };
      res.status(HttpStatusCodeEnum.OK).json(apiResponse);
    } catch (error) {
      const response: ApiResponse<any> = {
        data: error,
        isError: true,
      };
      res.status(HttpStatusCodeEnum.BadRequest).json(response);
    }
  };

  public updateDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const sigFoxService = new SigFoxService();
      const request: UpdateDeviceRequest = req.body;
      const deviceId: string = req.params.id;
      const result: ActionDeviceResponse = await sigFoxService.updateDevice(deviceId, request);
      const apiResponse: ApiResponse<ActionDeviceResponse> = {
        data: result,
        isError: false,
      };
      res.status(HttpStatusCodeEnum.OK).json(apiResponse);
    } catch (error) {
      const response: ApiResponse<any> = {
        data: error,
        isError: true,
      };
      res.status(HttpStatusCodeEnum.BadRequest).json(response);
    }
  };

  public removeDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const sigFoxService = new SigFoxService();
      const deviceId: string = req.params.id;
      const result: ActionDeviceResponse = await sigFoxService.removeDevice(deviceId);
      const apiResponse: ApiResponse<ActionDeviceResponse> = {
        data: result,
        isError: false,
      };
      res.status(HttpStatusCodeEnum.OK).json(apiResponse);
    } catch (error) {
      const response: ApiResponse<any> = {
        data: error,
        isError: true,
      };
      res.status(HttpStatusCodeEnum.BadRequest).json(response);
    }
  };

  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(HttpStatusCodeEnum.OK);
    } catch (error) {
      next(error);
    }
  };
}

export default SigFoxController;
