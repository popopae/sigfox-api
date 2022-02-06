import { SixFogConfig } from '../../interfaces/sigfox.interface';
import config from 'config';

class HeaderOptionHelper {
  public static sigFoxGetOption(path: string): any {
    const sigFogConfig: SixFogConfig = config.get('sigFox');
    const options: any = {
      uri: `${sigFogConfig.api_url}${path}`,
      auth: {
        user: sigFogConfig.basic_username,
        password: sigFogConfig.basic_password,
      },
      json: true, // Automatically parses the JSON string in the response
    };

    return options;
  }

  public static sigFoxPostOption(path: string, payload: any): any {
    const sigFogConfig: SixFogConfig = config.get('sigFox');
    const options: any = {
      uri: `${sigFogConfig.api_url}${path}`,
      auth: {
        user: sigFogConfig.basic_username,
        password: sigFogConfig.basic_password,
      },
      body: payload,
      json: true, // Automatically parses the JSON string in the response
    };

    return options;
  }
}

export default HeaderOptionHelper;
