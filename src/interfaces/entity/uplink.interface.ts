import { IDevice } from './device.interface';

export interface IUplink {
  id?: number;
  device_id?: number;
  current_amp?: number;
  voltage?: number;
  active_power?: number;
  power_factor?: number;
  frequency?: number;
  statue_onoff?: number;
  controller_temp?: number;
  active_energy?: number;
  brightness?: number;
  status_device?: string;
  created_date?: Date;

  device?: IDevice;
}
