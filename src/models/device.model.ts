import { Model, ModelObject } from 'objection';
import { IDevice } from '../interfaces/entity/device.interface';
import { IUplink } from '../interfaces/entity/uplink.interface';

export class Device extends Model implements IDevice {
  device_id!: number;
  device_name!: string;

  uplinks!: IUplink[];

  static tableName = 'device'; // database table name
  static idColumn = 'device_id'; // id column name
}

export type DeviceShape = ModelObject<Device>;
