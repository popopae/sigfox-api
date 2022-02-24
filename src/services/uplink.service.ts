import { LastedUplinkColumn, LastedUplinkResponse } from '@/interfaces/payloads/callback/lastedUplinkResponse';
import { Device } from '@/models/device.model';
import { Uplink } from '../models/uplink.model';

class UplinkService {
  public async findAll(): Promise<Uplink[]> {
    const res: Uplink[] = await Uplink.query().select().from(Uplink.tableName);
    return res;
  }

  public async findLastedByDeviceCode(item: string): Promise<LastedUplinkResponse> {
    const res: LastedUplinkResponse = await Uplink.query()
      .select(
        `${LastedUplinkColumn.uplink_id}`,
        `${LastedUplinkColumn.device_id}`,
        `${LastedUplinkColumn.current_amp}`,
        `${LastedUplinkColumn.voltage}`,
        `${LastedUplinkColumn.active_power}`,
        `${LastedUplinkColumn.power_factor}`,
        `${LastedUplinkColumn.frequency}`,
        `${LastedUplinkColumn.statue_onoff}`,
        `${LastedUplinkColumn.controller_temp}`,
        `${LastedUplinkColumn.active_energy}`,
        `${LastedUplinkColumn.brightness}`,
        `${LastedUplinkColumn.status_device}`,
        `${LastedUplinkColumn.created_date}`,
        `${LastedUplinkColumn.device_code}`,
        `${LastedUplinkColumn.device_name}`,
        `${LastedUplinkColumn.device_type_id}`,
        `${LastedUplinkColumn.device_type_name}`,
      )
      .from(Uplink.tableName)
      .innerJoin(Device.tableName, `${Uplink.tableName}.${Uplink.deviceId}`, `${Device.tableName}.${Device.deviceId}`)
      .where(`${Device.tableName}.${Device.deviceCode}`, '=', item)
      .orderBy(`${Uplink.tableName}.${Uplink.uplinkId}`, 'desc')
      .first();
    return res;
  }
}

export default UplinkService;
