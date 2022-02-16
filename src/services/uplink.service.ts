import { Uplink } from '../models/uplink.model';

class UplinkService {
  public async findAll(): Promise<Uplink[]> {
    const res: Uplink[] = await Uplink.query().select().from(Uplink.tableName);
    return res;
  }

  public async findLastedByDeviceId(item: number): Promise<Uplink> {
    const res: Uplink = await Uplink.query()
      .select()
      .from(Uplink.tableName)
      .where(Uplink.deviceId, '=', item)
      .orderBy(Uplink.uplinkId, 'desc')
      .first();
    return res;
  }
}

export default UplinkService;
