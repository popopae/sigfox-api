import { TestTable } from '../models/testtable.model';

class TestService {
  public findAll = async (): Promise<TestTable[]> => {
    const users: TestTable[] = await TestTable.query().select().from(TestTable.tableName);
    return users;
  };
}

export default TestService;
