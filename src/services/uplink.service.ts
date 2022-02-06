import { Uplink } from '../models/uplink.model';

class UplinkService {
  public async findAll(): Promise<Uplink[]> {
    const res: Uplink[] = await Uplink.query().select().from(Uplink.tableName);
    return res;
  }
}

export default UplinkService;
