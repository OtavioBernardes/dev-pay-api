import { NewAccount } from "../../../use-cases/account/new-account"
import { MysqlAdapter } from "../../../external/repositories/adapters"
import { UserRepositoryDatabase } from "../../../external/repositories"

export const makeDbNewAccount = (): NewAccount => {
    const connection = new MysqlAdapter()
	const inDatabaseRepository = new UserRepositoryDatabase(connection);
    const usecase = new NewAccount(inDatabaseRepository)
    return usecase
}