import 'dotenv/config';
import '@/index';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import DeviceRoute from '@routes/device.route';
import validateEnv from '@utils/validateEnv';
import UplinkRoute from '@routes/uplink.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new DeviceRoute(), new UplinkRoute()]);

app.listen();
