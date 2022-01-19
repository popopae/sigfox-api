import { CreateDeviceRequest } from '@/interfaces/payloads/device/createDeviceRequest';
import { CreateDeviceResponse } from '@/interfaces/payloads/device/createDeviceResponse';
import { DeviceResponse } from '@/interfaces/payloads/device/deviceResponse';
import { DeviceTypeResponse } from '@/interfaces/payloads/device/deviceTypeResponse';
import { ExternalPathEnum } from '@/utils/enums/externalPathEnum';
import HeaderOptionHelper from '@/utils/helper/headerOptionHelper';
import { get, post } from 'request-promise';

class DeviceService {
  public async getListDeviceType(): Promise<DeviceTypeResponse> {
    const options: any = HeaderOptionHelper.sigFoxGetOption(ExternalPathEnum.GET_LIST_DEVICE_TYPE);
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
    const options: any = HeaderOptionHelper.sigFoxGetOption(ExternalPathEnum.GET_LIST_DEVICE_TYPE);
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
    const options: any = HeaderOptionHelper.sigFoxPostOption(ExternalPathEnum.GET_LIST_DEVICE, request);
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
}

export default DeviceService;
