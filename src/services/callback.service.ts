import { HttpException } from '../exceptions/HttpException';
import { ICallBack } from '../interfaces/entity/callback.interface';
import { CallBack } from '../models/callback.model';
import { isEmpty } from 'class-validator';

class CallBackService {
  public async findAll(): Promise<CallBack[]> {
    const res: CallBack[] = await CallBack.query().select().from(CallBack.tableName);
    return res;
  }

  public async createCallBack(data: ICallBack): Promise<CallBack> {
    if (isEmpty(data)) throw new HttpException(400, 'Data not null or empty.');

    const createData: CallBack = await CallBack.query()
      .insert({ ...data })
      .into(CallBack.tableName);

    return createData;
  }
}

export default CallBackService;
