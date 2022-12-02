import { NewAccount } from "../../../use-cases/new-account"
import { MysqlAdapter } from "../../../external/database/adapters"
import { UserRepositoryDatabase } from "../../../external/database/mysql"
import { AccountRepositoryDatabase } from "../../../external/database/mysql"
import Connection from "src/external/database/ports/connection"
import { Hasher } from "src/use-cases/ports"
import { UserRepository } from "src/domain/ports/user-repository"
import { AccountRepository } from "src/domain/ports/account-repository"
import { BcryptAdapter } from "../../../external/cryptography/bcrypt-adapter"

export const MakeDbNewAccount = (
    paramConnection?: Connection,
    paramInDatabaseRepositoryUser?: UserRepository,
    paramInDatabaseRepositoryAccount?: AccountRepository,
    paramHasher?: Hasher

): NewAccount => {
    const connection = paramConnection ? paramConnection : new MysqlAdapter()
    const inDatabaseRepositoryUser = paramInDatabaseRepositoryUser ? paramInDatabaseRepositoryUser : new UserRepositoryDatabase(connection);
    const inDatabaseRepositoryAccount = paramInDatabaseRepositoryAccount ? paramInDatabaseRepositoryAccount : new AccountRepositoryDatabase(connection);
    const hasher = paramHasher ? paramHasher : new BcryptAdapter(8)
    return new NewAccount(inDatabaseRepositoryUser, inDatabaseRepositoryAccount, hasher)
}