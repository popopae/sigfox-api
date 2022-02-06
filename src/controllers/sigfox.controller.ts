import { ApiResponse } from '../interfaces/payloads/api/apiResponse';
import { CreateDeviceRequest } from '../interfaces/payloads/device/createDeviceRequest';
import { CreateDeviceResponse } from '../interfaces/payloads/device/createDeviceResponse';
import { DeviceResponse } from '../interfaces/payloads/device/deviceResponse';
import { DeviceTypeResponse } from '../interfaces/payloads/device/deviceTypeResponse';
import { ActionDeviceResponse } from '../interfaces/payloads/device/actionDeviceResponse';
import sigFoxService from '../services/sigfox.service';
import { NextFunction, Request, Response } from 'express';
import { UpdateDeviceRequest } from '../interfaces/payloads/device/updateDeviceRequest';

class SigFoxController {
  public sigFoxService = new sigFoxService();

  public getListDeviceType = async (req: Request, res: Response): Promise<void> => {
    try {
      const result: DeviceTypeResponse = await this.sigFoxService.getListDeviceType();
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

  public getListDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const result: DeviceResponse = await this.sigFoxService.getListDevice();
      const apiResponse: ApiResponse<DeviceResponse> = {
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

  public createDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const request: CreateDeviceRequest = req.body;
      const result: CreateDeviceResponse = await this.sigFoxService.createDevice(request);
      const apiResponse: ApiResponse<CreateDeviceResponse> = {
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

  public updateDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const request: UpdateDeviceRequest = req.body;
      const deviceId: string = req.params.id;
      const result: ActionDeviceResponse = await this.sigFoxService.updateDevice(deviceId, request);
      const apiResponse: ApiResponse<ActionDeviceResponse> = {
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

  public removeDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      const deviceId: string = req.params.id;
      const result: ActionDeviceResponse = await this.sigFoxService.removeDevice(deviceId);
      const apiResponse: ApiResponse<ActionDeviceResponse> = {
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

export default SigFoxController;
