import { HttpException } from '../exceptions/HttpException';
import { ICallBack } from '../interfaces/entity/callback.interface';
import { CallBack } from '../models/callback.model';
import { isNotEmptyObject } from 'class-validator';
import { UplinkDto } from '@/dtos/payload/callback/uplink.dto';

class CallBackService {
  public async findAll(): Promise<CallBack[]> {
    const res: CallBack[] = await CallBack.query().select().from(CallBack.tableName);
    return res;
  }

  public async createCallBack(uplinkData: UplinkDto): Promise<CallBack> {
    if (!isNotEmptyObject(uplinkData)) throw new HttpException(400, 'Data not null or empty.');

    const data: ICallBack = {
      device_type_id: uplinkData.deviceTypeId,
      device_id: uplinkData.deviceId,
      callback_data: uplinkData.data,
      callback_status: 'success',
      created_date: new Date(),
    };

    const createData: CallBack = await CallBack.query()
      .insert({ ...data })
      .into(CallBack.tableName);

    return createData;
  }
}

export default CallBackService;
