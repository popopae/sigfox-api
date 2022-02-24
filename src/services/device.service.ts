import { AdvanceSearch } from '@/dtos/payload/datatable/dataTableRequest.dto';
import { HttpException } from '@/exceptions/HttpException';
import { DataTableRequest } from '@/interfaces/payloads/datatable/dataTableRequest';
import { HttpStatusCodeEnum } from '@/utils/enums/httpStatusEnum';
import ValidateHelper from '@/utils/helper/validateHelper';
import { Device } from '../models/device.model';

class DeviceService {
  public async findAll(): Promise<Device[]> {
    const res: Device[] = await Device.query().select().from(Device.tableName);
    return res;
  }

  public async findByDeviceCode(item: string): Promise<Device> {
    const resp: Device = await Device.query().select().from(Device.tableName).where(Device.deviceCode, '=', item).first();
    if (ValidateHelper.isObjectEmptyNullUndefined(resp)) throw new HttpException(HttpStatusCodeEnum.NotFound, `Device ${item} Not Found`);

    return resp;
  }

  public async findByDeviceId(item: number): Promise<Device> {
    const resp: Device = await Device.query().select().from(Device.tableName).where(Device.deviceId, '=', item).first();
    if (ValidateHelper.isObjectEmptyNullUndefined(resp)) throw new HttpException(HttpStatusCodeEnum.NotFound, `Device ${item} Not Found`);

    return resp;
  }

  public async findByAdvanceSearch(request: DataTableRequest): Promise<Device[]> {
    const resp: Device[] = await this.queryBuilder(Device.query().select().from(Device.tableName), request);
    if (ValidateHelper.isObjectEmptyNullUndefined(resp)) throw new HttpException(HttpStatusCodeEnum.NotFound, `Device advance search Not Found`);

    return resp;
  }

  public async totalDevice(): Promise<number> {
    const resp: number = await (await Device.query().select(Device.deviceId).from(Device.tableName)).length;

    return resp;
  }

  public queryBuilder(query: any, request: DataTableRequest) {
    request.advanceSearch.forEach((item: AdvanceSearch, index) => {
      if (index === 0) {
        if (item.value.trim() !== '' && item.multiValue.length === 0) {
          query.where(item.column, item.condition, item.value);
        }
      } else {
        if (item.key === 'and') {
          query.andWhere(item.column, item.condition, item.value);
        }

        if (item.key === 'or') {
          query.orWhere(item.column, item.condition, item.value);
        }
      }
    });

    return query.offset(request.pageNumber).limit(request.recordLength);
  }
}

export default DeviceService;
