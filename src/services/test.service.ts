import { TestTable } from '@/models/testtable.model';

class TestService {
  public async findAll(): Promise<TestTable[]> {
    const users: TestTable[] = await TestTable.query().select().from(TestTable.tableName);
    return users;
  }
}

export default TestService;
