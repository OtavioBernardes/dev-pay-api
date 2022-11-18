import { CreditAccount } from "../../../use-cases/credit-account"
import { MysqlAdapter } from "../../../external/database/adapters"
import { AccountRepositoryDatabase } from "../../../external/database/mysql"
import Connection from "src/external/database/ports/connection"
import { AccountRepository } from "src/domain/ports/account-repository"

export const MakeDbCreditAccount = (
    connectionParam?: Connection,
    inDatabaseRepositoryAccountParam?: AccountRepository
): CreditAccount => {
    const connection = connectionParam ? connectionParam : new MysqlAdapter()
    const inDatabaseRepositoryAccount = inDatabaseRepositoryAccountParam ? inDatabaseRepositoryAccountParam : new AccountRepositoryDatabase(connection);
    return new CreditAccount(inDatabaseRepositoryAccount)
}