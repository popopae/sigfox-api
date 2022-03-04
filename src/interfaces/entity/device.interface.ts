import { IUplink } from './uplink.interface';

export interface IDevice {
  id: number;
  device_name: string;
  device_code?: string;
  device_type_id?: string;
  device_type_name?: string;
  product_certificate?: string;
  pac?: string;
  activable?: boolean;
  automatic_renewal?: boolean;
  location_lat?: number;
  location_lng?: number;
  prototype?: boolean;
  created_by?: string;
  created_date?: Date;
  updated_by?: string;
  updated_date?: Date;

  uplinks: IUplink[];
}
