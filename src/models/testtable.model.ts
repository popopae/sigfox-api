import { Model, ModelObject } from 'objection';
import { ITestTable } from '../interfaces/entity/testtable.interface';

export class TestTable extends Model implements ITestTable {
  id!: number;
  name!: string;

  static tableName = 'testtable'; // database table name
  static idColumn = 'id'; // id column name
}

export type TestTableShape = ModelObject<TestTable>;
