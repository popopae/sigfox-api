import { Device } from '../models/device.model';

class DeviceService {
  public async findAll(): Promise<Device[]> {
    const res: Device[] = await Device.query().select().from(Device.tableName);
    return res;
  }
}

export default DeviceService;
