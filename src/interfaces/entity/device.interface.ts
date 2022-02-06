import { IUplink } from './uplink.interface';

export interface IDevice {
  device_id: number;
  device_name: string;

  uplinks: IUplink[];
}
