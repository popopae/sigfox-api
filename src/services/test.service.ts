import { TestTable } from '../models/testtable.model';

export class TestService {
  public async findAll(): Promise<TestTable[]> {
    console.log('Test');
    const users: TestTable[] = await TestTable.query().select().from(TestTable.tableName);
    return users;
  }
}

export default TestService;
