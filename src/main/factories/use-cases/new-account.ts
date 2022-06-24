import { NewAccount } from "../../../use-cases/account/new-account"
import { MysqlAdapter } from "../../../external/database/adapters"
import { UserRepositoryDatabase } from "../../../external/database/mysql"
import { AccountRepositoryDatabase } from "../../../external/database/mysql"

export const makeDbNewAccount = (): NewAccount => {
    const connection = new MysqlAdapter()
	const inDatabaseRepositoryUser = new UserRepositoryDatabase(connection);
    const inDatabaseRepositoryAccount = new AccountRepositoryDatabase(connection);
    const usecase = new NewAccount(inDatabaseRepositoryUser, inDatabaseRepositoryAccount)
    return usecase
}