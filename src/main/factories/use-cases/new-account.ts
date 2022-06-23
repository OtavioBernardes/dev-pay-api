import { NewAccount } from "../../../use-cases/account/new-account"
import { MysqlAdapter } from "../../../external/repositories/adapters"
import { UserRepositoryDatabase } from "../../../external/repositories"
import { AccountRepositoryDatabase } from "../../../external/repositories/account-repository-database"

export const makeDbNewAccount = (): NewAccount => {
    const connection = new MysqlAdapter()
	const inDatabaseRepositoryUser = new UserRepositoryDatabase(connection);
    const inDatabaseRepositoryAccount = new AccountRepositoryDatabase(connection);
    const usecase = new NewAccount(inDatabaseRepositoryUser, inDatabaseRepositoryAccount)
    return usecase
}