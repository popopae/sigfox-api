import 'dotenv/config';
import '@/index';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import SigFoxRoute from '@/routes/sigfox.route';
import validateEnv from '@utils/validateEnv';
import UplinkRoute from '@routes/uplink.route';
import DeviceRoute from './routes/device.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new SigFoxRoute(), new UplinkRoute(), new DeviceRoute()]);

app.listen();
