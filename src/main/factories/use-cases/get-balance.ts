import { MysqlAdapter } from "../../../external/database/adapters"
import { AccountRepositoryDatabase } from "../../../external/database/mysql"
import Connection from "src/external/database/ports/connection"
import { AccountRepository } from "src/domain/ports/account-repository"
import { GetBalance } from "../../../use-cases/get-balance"

export const MakeDbGetBalance = (
    connectionParam?: Connection,
    inDatabaseRepositoryAccountParam?: AccountRepository
): GetBalance => {
    const connection = connectionParam ? connectionParam : new MysqlAdapter()
    const inDatabaseRepositoryAccount = inDatabaseRepositoryAccountParam ? inDatabaseRepositoryAccountParam : new AccountRepositoryDatabase(connection);
    return new GetBalance(inDatabaseRepositoryAccount)
}