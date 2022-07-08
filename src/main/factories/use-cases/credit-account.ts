import { CreditAccount } from "../../../use-cases/credit-account"
import { MysqlAdapter } from "../../../external/database/adapters"
import { AccountRepositoryDatabase } from "../../../external/database/mysql"

export const MakeDbCreditAccount = (): CreditAccount => {
    const connection = new MysqlAdapter()
    const inDatabaseRepositoryAccount = new AccountRepositoryDatabase(connection);
    return new CreditAccount(inDatabaseRepositoryAccount)
}