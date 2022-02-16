import { HttpException } from '../exceptions/HttpException';
import { ICallBack } from '../interfaces/entity/callback.interface';
import { CallBack } from '../models/callback.model';
import { isEmpty, isNotEmptyObject } from 'class-validator';
import { UplinkDto } from '@/dtos/payload/callback/uplink.dto';
import { Uplink } from '@/models/uplink.model';
import { IUplink } from '@/interfaces/entity/uplink.interface';
import { DecodeUplink } from '@/interfaces/common/decodeUplink';
import ValidateHelper from '@/utils/helper/validateHelper';
import DeviceService from './device.service';
import { Device } from '@/models/device.model';
import { HttpStatusCodeEnum } from '@/utils/enums/httpStatusEnum';
import DateTimeHelper from '@/utils/helper/dateTimeHelper';

class CallBackService {
  public async findAll(): Promise<CallBack[]> {
    const res: CallBack[] = await CallBack.query().select().from(CallBack.tableName);
    return res;
  }

  public async createCallBack(data: UplinkDto): Promise<CallBack> {
    if (!isNotEmptyObject(data)) throw new HttpException(HttpStatusCodeEnum.BadRequest, 'Uplink data not null or empty.');
    if (isEmpty(data.data)) throw new HttpException(HttpStatusCodeEnum.BadRequest, 'Data not null or empty.');

    const decodeValue: DecodeUplink = this.parseSigFox(data.data);
    if (ValidateHelper.isObjectEmptyNullUndefined(decodeValue)) {
      throw new HttpException(HttpStatusCodeEnum.BadRequest, 'Cannot decode uplink value.');
    }

    const deviceService = new DeviceService();
    const deviceData: Device = await deviceService.findByDeviceCode(data.deviceId);

    const callBackData: ICallBack = {
      device_type_id: data.deviceTypeId,
      device_id: data.deviceId,
      callback_data: data.data,
      callback_status: 'success',
      callback_time: new Date(DateTimeHelper.convertNumberToDate(data.time)),
      created_date: new Date(),
    };

    const uplinkData: IUplink = {
      device_id: deviceData.device_id,
      current_amp: decodeValue.current,
      voltage: decodeValue.voltage,
      active_power: decodeValue.activePower,
      power_factor: decodeValue.powerFactor,
      frequency: decodeValue.frequency,
      statue_onoff: 0,
      controller_temp: decodeValue.controllerTemp,
      active_energy: decodeValue.activeEnergy,
      brightness: decodeValue.brightness,
      status_device: decodeValue.noLoad,
      created_date: new Date(),
    };

    const resultCallBack: CallBack = await CallBack.query()
      .insert({ ...callBackData })
      .into(CallBack.tableName);

    const resultUplink: Uplink = await Uplink.query()
      .insert({ ...uplinkData })
      .into(Uplink.tableName);
    console.log(resultUplink);
    return resultCallBack;
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

  public parsePositionalData(buffer): DecodeUplink {
    const messageType: number = buffer[0] & 0xff;

    if (messageType == 0 && buffer.length == 12) {
      let highCurrent = '';
      let lowCurrent = '';
      let highVoltage = '';
      let lowVoltage = '';
      let noLoad = '';
      let lightStatus = false;

      if (buffer[1] & 0x01) {
        highCurrent = 'alarm';
      } else {
        highCurrent = 'normal';
      }

      if (buffer[1] & 0x02) {
        lowCurrent = 'alarm';
      } else {
        lowCurrent = 'normal';
      }

      if (buffer[1] & 0x04) {
        highVoltage = 'alarm';
      } else {
        highVoltage = 'normal';
      }

      if (buffer[1] & 0x08) {
        lowVoltage = 'alarm';
      } else {
        lowVoltage = 'normal';
      }

      if (buffer[1] & 0x10) {
        noLoad = 'alarm';
      } else {
        noLoad = 'normal';
      }

      const currentRaw: number = this.parseBigEndianInt16(buffer, 3) / 100;
      const voltageRaw: number = this.parseBigEndianInt16(buffer, 5) / 100;

      const powerFactorRaw: number = this.parseBigEndianInt8(buffer, 6) / 100;
      const frequencyRaw: number = this.parseBigEndianInt16(buffer, 8) / 100;
      const controllerTempRaw: number = this.parseBigEndianInt16(buffer, 10) / 100;

      if (buffer[11] & 0x80 && buffer.length == 12) {
        lightStatus = true;
      }

      const brightnessRaw = buffer[11] & 0x7f;
      const result: DecodeUplink = {
        buffer: buffer,
        messageType: messageType,
        highCurrent: highCurrent,
        lowCurrent: lowCurrent,
        highVoltage: highVoltage,
        lowVoltage: lowVoltage,
        noLoad: noLoad,
        current: currentRaw,
        voltage: voltageRaw,
        powerFactor: powerFactorRaw,
        frequency: frequencyRaw,
        controllerTemp: controllerTempRaw,
        lightStatus: lightStatus,
        brightness: brightnessRaw,
      };
      return result;
    } else if (messageType == 1 && buffer.length == 9) {
      const activePower: number = this.parseBigEndianInt32(buffer, 4) / 100;
      const activeEnergy: number = this.parseBigEndianInt32(buffer, 8) / 100;

      const result: DecodeUplink = {
        buffer: buffer,
        messageType: messageType,
        activePower: activePower,
        activeEnergy: activeEnergy,
      };
      return result;
    }

    return null;
  }

  public parseLittleEndianInt32(buffer, offset) {
    return (buffer[offset + 3] << 24) + (buffer[offset + 2] << 16) + (buffer[offset + 1] << 8) + buffer[offset];
  }

  public parseLittleEndianInt16(buffer, offset) {
    return (buffer[offset + 1] << 8) + buffer[offset];
  }

  public parseBigEndianInt32(buffer, offset) {
    return (buffer[offset - 3] << 24) + (buffer[offset - 2] << 16) + (buffer[offset - 1] << 8) + buffer[offset];
  }

  public parseBigEndianInt16(buffer, offset) {
    return (buffer[offset - 1] << 8) + buffer[offset];
  }

  public parseBigEndianInt8(buffer, offset) {
    return buffer[offset];
  }

  public parseLittleEndianInt16Bits(buffer, offset, bitOffset, bitLength) {
    let temp = this.parseLittleEndianInt16(buffer, offset);
    temp = temp >> bitOffset;
    const mask = 0xffff >> (16 - bitLength);
    return temp & mask;
  }
}

export default CallBackService;
