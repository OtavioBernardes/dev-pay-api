import { NewAccount } from "../../../../use-cases/account/new-account"
import { MysqlAdapter } from "../../../../external/database/adapters"
import { UserRepositoryDatabase } from "../../../../external/database/mysql"
import { AccountRepositoryDatabase } from "../../../../external/database/mysql"
import { BcryptAdapter } from "../../../../external/cryptography/bcrypt-adapter"

export const makeDbNewAccount = (): NewAccount => {
    const connection = new MysqlAdapter()
    const inDatabaseRepositoryUser = new UserRepositoryDatabase(connection);
    const inDatabaseRepositoryAccount = new AccountRepositoryDatabase(connection);
    const hasher = new BcryptAdapter(8)
    return new NewAccount(inDatabaseRepositoryUser, inDatabaseRepositoryAccount, hasher)
}