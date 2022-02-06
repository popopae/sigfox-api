import { CreateDeviceRequest } from '@/interfaces/payloads/device/createDeviceRequest';
import { CreateDeviceResponse } from '@/interfaces/payloads/device/createDeviceResponse';
import { DeviceResponse } from '@/interfaces/payloads/device/deviceResponse';
import { DeviceTypeResponse } from '@/interfaces/payloads/device/deviceTypeResponse';
import { ActionDeviceResponse } from '@/interfaces/payloads/device/actionDeviceResponse';
import { UpdateDeviceRequest } from '@/interfaces/payloads/device/updateDeviceRequest';
import { ExternalPathEnum } from '@/utils/enums/externalPathEnum';
import HeaderOptionHelper from '@/utils/helper/headerOptionHelper';
import { del, get, post, put } from 'request-promise';

class SigFoxService {
  public async getListDeviceType(): Promise<DeviceTypeResponse> {
    const options: any = HeaderOptionHelper.sigFoxGetOption(ExternalPathEnum.PATH_DEVICE_TYPE);
    return new Promise(function (resolve, reject) {
      get(options)
        .then(function (response: DeviceTypeResponse) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  public async getListDevice(): Promise<DeviceResponse> {
    const options: any = HeaderOptionHelper.sigFoxGetOption(ExternalPathEnum.PATH_DEVICE);
    return new Promise(function (resolve, reject) {
      get(options)
        .then(function (response: DeviceResponse) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  public async createDevice(request: CreateDeviceRequest): Promise<CreateDeviceResponse> {
    const options: any = HeaderOptionHelper.sigFoxPostOption(ExternalPathEnum.PATH_DEVICE, request);
    return new Promise(function (resolve, reject) {
      post(options)
        .then(function (response: CreateDeviceResponse) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  public async updateDevice(deviceId: string, request: UpdateDeviceRequest): Promise<ActionDeviceResponse> {
    const options: any = HeaderOptionHelper.sigFoxPostOption(`${ExternalPathEnum.PATH_DEVICE}/${deviceId}`, request);
    return new Promise(function (resolve, reject) {
      put(options)
        .then(function (response: ActionDeviceResponse) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  public async removeDevice(deviceId: String): Promise<ActionDeviceResponse> {
    const options: any = HeaderOptionHelper.sigFoxGetOption(`${ExternalPathEnum.PATH_DEVICE}/${deviceId}`);
    return new Promise(function (resolve, reject) {
      del(options)
        .then(function (response: ActionDeviceResponse) {
          resolve(response);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
}

export default SigFoxService;
