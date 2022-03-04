import { Model, ModelObject } from 'objection';
import { IDevice } from '../interfaces/entity/device.interface';
import { IUplink } from '../interfaces/entity/uplink.interface';

export class Uplink extends Model implements IUplink {
  id!: number;
  device_id!: number;
  current_amp!: number;
  voltage!: number;
  active_power!: number;
  power_factor!: number;
  frequency!: number;
  statue_onoff!: number;
  controller_temp!: number;
  active_energy!: number;
  brightness!: number;
  status_device!: string;
  created_date!: Date;

  device!: IDevice;

  static tableName = 'uplink'; // database table name
  static uplinkId = 'id'; // id column name
  static deviceId = 'device_id'; // id column name
}

export type UplinkShape = ModelObject<Uplink>;
