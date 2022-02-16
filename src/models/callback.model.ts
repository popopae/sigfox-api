import { ICallBack } from '../interfaces/entity/callback.interface';
import { Model, ModelObject } from 'objection';

export class CallBack extends Model implements ICallBack {
  id!: number;
  device_type_id!: string;
  device_id!: string;
  callback_data!: string;
  callback_status!: string;
  callback_time!: Date;
  created_date!: Date;

  static tableName = 'callback'; // database table name
  static idColumn = 'id'; // id column name
}

export type CallBackShape = ModelObject<CallBack>;
