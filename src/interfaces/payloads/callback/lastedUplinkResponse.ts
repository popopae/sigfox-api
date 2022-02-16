export interface LastedUplinkResponse {
  uplink_id?: number;
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

  device_code?: string;
  device_name?: string;
  device_type_id?: string;
  device_type_name?: string;
}

export class LastedUplinkColumn {
  static uplink_id = 'uplink.uplink_id';
  static device_id = 'uplink.device_id';
  static current_amp = 'uplink.current_amp';
  static voltage = 'uplink.voltage';
  static active_power = 'uplink.active_power';
  static power_factor = 'uplink.power_factor';
  static frequency = 'uplink.frequency';
  static statue_onoff = 'uplink.statue_onoff';
  static controller_temp = 'uplink.controller_temp';
  static active_energy = 'uplink.active_energy';
  static brightness = 'uplink.brightness';
  static status_device = 'uplink.status_device';
  static created_date = 'uplink.created_date';

  static device_code = 'device.device_code';
  static device_name = 'device.device_name';
  static device_type_id = 'device.device_type_id';
  static device_type_name = 'device.device_type_name';
}
