import { HttpException } from '../exceptions/HttpException';
import { ICallBack } from '../interfaces/entity/callback.interface';
import { CallBack } from '../models/callback.model';
import { isEmpty, isNotEmptyObject } from 'class-validator';
import { UplinkDto } from '@/dtos/payload/callback/uplink.dto';

class CallBackService {
  public async findAll(): Promise<CallBack[]> {
    const res: CallBack[] = await CallBack.query().select().from(CallBack.tableName);
    return res;
  }

  public async createCallBack(uplinkData: UplinkDto): Promise<CallBack> {
    if (!isNotEmptyObject(uplinkData)) throw new HttpException(400, 'Uplink data not null or empty.');
    if (isEmpty(uplinkData.data)) throw new HttpException(400, 'Data not null or empty.');

    const data: ICallBack = {
      device_type_id: uplinkData.deviceTypeId,
      device_id: uplinkData.deviceId,
      callback_data: uplinkData.data,
      callback_status: 'success',
      callback_time: uplinkData.time,
      created_date: new Date(),
    };
    const value = this.parseSigFox(uplinkData.data);
    console.log(value);

    const hex = parseInt(uplinkData.data, 16).toString(2);

    const createData: CallBack = await CallBack.query()
      .insert({ ...data })
      .into(CallBack.tableName);

    return createData;
  }

  public parseSigFox(data) {
    const buffer = this.hex2Bytes(data);
    if (!buffer) {
      return null;
    }
    return this.parsePositionalData(buffer);
  }

  public hex2Bytes(val) {
    if (!val) {
      return [];
    }

    val = val.trim();
    if (val.startsWith('0x')) {
      val = val.substring(2); //get rid of starting '0x'
    }

    const numBytes = val.length / 2;
    const bytes = [];

    for (let i = 0; i < numBytes; i++) {
      bytes.push(parseInt(val.substring(i * 2, i * 2 + 2), 16));
    }
    return bytes;
  }

  public parsePositionalData(buffer) {
    const flags = buffer[0] & 0xf0;
    const currentRaw = this.parseLittleEndianInt16Bits(buffer, 1, 16, 2);
    const voltageRaw = this.parseLittleEndianInt16Bits(buffer, 4, 16, 2);

    const powerFactorRaw = this.parseLittleEndianInt16Bits(buffer, 6, 8, 1);
    const frequencyRaw = this.parseLittleEndianInt16Bits(buffer, 7, 8, 2);
    const controllerTempRaw = buffer[9];
    const lightStatus = buffer[10];
    const brightnessRaw = buffer[11];

    return {
      buffer: buffer,
      MessageType: 0,
      Status: '',
      Current: currentRaw,
      Voltage: voltageRaw,
      PowerFactor: powerFactorRaw,
      Frequency: frequencyRaw,
      ControllerTemp: controllerTempRaw,
      LightStatus: lightStatus,
      Brightness: brightnessRaw,
    };
  }

  public parseLittleEndianInt32(buffer, offset) {
    return (buffer[offset + 3] << 24) + (buffer[offset + 2] << 16) + (buffer[offset + 1] << 8) + buffer[offset];
  }

  public parseLittleEndianInt16(buffer, offset) {
    return (buffer[offset + 1] << 8) + buffer[offset];
  }

  public parseLittleEndianInt16Bits(buffer, offset, bitOffset, bitLength) {
    let temp = this.parseLittleEndianInt16(buffer, offset);
    temp = temp >> bitOffset;
    const mask = 0xffff >> (16 - bitLength);
    return temp & mask;
  }
}

export default CallBackService;
