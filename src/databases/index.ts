import config from 'config';
import Knex from 'knex';
import fs from 'fs';
import path from 'path';
import { dbConfig } from '../interfaces/db.interface';

const db: dbConfig = config.get('dbConfig');
const dbConnection = {
  client: 'pg',
  connection: {
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port,
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(path.resolve(__dirname, './../cert/ca-certificate.crt')).toString(),
    },
  },
};

export default Knex(dbConnection);
