import { HttpStatusCodeEnum } from '@/utils/enums/httpStatusEnum';
import { NextFunction, Request, Response } from 'express';
import { ITestTable } from '../interfaces/entity/testtable.interface';
import TestService from '../services/test.service';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(HttpStatusCodeEnum.OK);
    } catch (error) {
      next(error);
    }
  };

  public getTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const testService = new TestService();
      const findAllUsersData: ITestTable[] = await testService.findAll();

      res.status(HttpStatusCodeEnum.OK).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
