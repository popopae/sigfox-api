import { HttpException } from '@/exceptions/HttpException';
import { HttpStatusCodeEnum } from '@/utils/enums/httpStatusEnum';
import ValidateHelper from '@/utils/helper/validateHelper';
import { Device } from '../models/device.model';

class DeviceService {
  public async findAll(): Promise<Device[]> {
    const res: Device[] = await Device.query().select().from(Device.tableName);
    return res;
  }

  public async findByDeviceCode(item: string): Promise<Device> {
    const find: Device = await Device.query().select().from(Device.tableName).where(Device.deviceCode, '=', item).first();
    if (ValidateHelper.isObjectEmptyNullUndefined(find)) throw new HttpException(HttpStatusCodeEnum.NotFound, `Device ${item} Not Found`);

    return find;
  }
}

export default DeviceService;
