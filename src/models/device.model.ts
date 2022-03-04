import { Model, ModelObject } from 'objection';
import { IDevice } from '../interfaces/entity/device.interface';
import { IUplink } from '../interfaces/entity/uplink.interface';

export class Device extends Model implements IDevice {
  id!: number;
  device_code!: string;
  device_name!: string;
  device_type_id!: string;
  device_type_name!: string;
  product_certificate!: string;
  pac!: string;
  activable!: boolean;
  automatic_renewal!: boolean;
  location_lat!: number;
  location_lng!: number;
  prototype!: boolean;
  created_by!: string;
  created_date!: Date;
  updated_by!: string;
  updated_date!: Date;

  uplinks!: IUplink[];

  static tableName = 'device'; // database table name
  static deviceId = 'device_id'; // id column name
  static deviceCode = 'device_code'; // id column name
}

export type DeviceShape = ModelObject<Device>;
