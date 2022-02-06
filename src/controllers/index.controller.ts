import { NextFunction, Request, Response } from 'express';
import { ITestTable } from '../interfaces/entity/testtable.interface';
import TestService from '../services/test.service';

class IndexController {
  public testService = new TestService();

  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public getTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: ITestTable[] = await this.testService.findAll();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
