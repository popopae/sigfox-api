import { HttpException } from '@/exceptions/HttpException';
import { DeviceTypeResponse } from '@/interfaces/payloads/device/deviceTypeResponse';
import { SixFogConfig } from '@/interfaces/sigfox.interface';
import { ExternalPathEnum } from '@/utils/enums/externalPathEnum';
import config from 'config';
import { get } from 'request-promise';

class DeviceService {
  public async getDeviceType(): Promise<any> {
    const sigFogConfig: SixFogConfig = config.get('sigFox');
    const options: any = {
      uri: `${sigFogConfig.api_url}${ExternalPathEnum.GET_LIST_DEVICE_TYPE}`,
      auth: {
        user: sigFogConfig.basic_username,
        password: sigFogConfig.basic_password,
      },
      json: true, // Automatically parses the JSON string in the response
    };

    return new Promise(function (resolve, reject) {
      get(options)
        .then(function (response: DeviceTypeResponse) {
          //const result: DeviceTypeResponse = JSON.parse(response);
          resolve(response);
        })
        .catch(function (err) {
          // API call failed...
          reject(err);
        });
    });
  }
}

export default DeviceService;
