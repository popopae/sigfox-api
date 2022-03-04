import { ApiResponse } from '@/interfaces/payloads/api/apiResponse';
import { DataTableRequest } from '@/interfaces/payloads/datatable/dataTableRequest';
import { DataTableResponse } from '@/interfaces/payloads/datatable/dataTableResponse';
import { HttpStatusCodeEnum } from '@/utils/enums/httpStatusEnum';
import { NextFunction, Request, Response } from 'express';
import { IDevice } from '../interfaces/entity/device.interface';
import deviceService from '../services/device.service';

class DeviceController {
  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const service = new deviceService();
      const result: IDevice[] = await service.findAll();
      const apiResponse: ApiResponse<IDevice[]> = {
        data: result,
        isError: false,
      };
      res.status(HttpStatusCodeEnum.OK).json(apiResponse);
    } catch (error) {
      next(error);
    }
  };

  public findByDeviceCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deviceId = req.params.id;
      const service = new deviceService();
      const result: IDevice = await service.findByDeviceCode(deviceId);
      const apiResponse: ApiResponse<IDevice> = {
        data: result,
        isError: false,
      };
      res.status(HttpStatusCodeEnum.OK).json(apiResponse);
    } catch (error) {
      next(error);
    }
  };

  public findByAdvanceSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const request: DataTableRequest = req.body;
      const service = new deviceService();
      const result: IDevice[] = await service.findByAdvanceSearch(request);
      const totalRecord: number = await service.totalDevice();
      const resp: DataTableResponse<IDevice> = {
        totalPage: Math.ceil(totalRecord / request.recordLength),
        pageNumber: request.pageNumber,
        itemPerPage: request.recordLength,
        totalRecord: totalRecord,
        resultRecord: result.length,
        data: result,
      };

      const apiResponse: ApiResponse<DataTableResponse<IDevice>> = {
        data: resp,
        isError: false,
      };
      res.status(HttpStatusCodeEnum.OK).json(apiResponse);
    } catch (error) {
      next(error);
    }
  };
}

export default DeviceController;
