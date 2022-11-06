import { Login } from "../../../use-cases/login"
import { MysqlAdapter } from "../../../external/database/adapters"
import { UserRepositoryDatabase } from "../../../external/database/mysql"
import { BcryptAdapter } from "../../../external/cryptography/bcrypt-adapter"
import { JsonwebtokenAdapter } from "../../../external/cryptography/jsonwebtoken-adapter"
import CacheFactory from "../cache/cache"
import Connection from "../../../external/database/ports/connection"
import { UserRepository } from "../../../domain/ports/user-repository"
import { Encrypter, Hasher } from "../../../use-cases/ports"
import { Cache } from "../../..//use-cases/ports/cache"

export const MakeDbLogin = (
    connectionParam?: Connection,
    inDatabaseRepositoryUserParam?: UserRepository,
    hasherParam?: Hasher,
    encryptParam?: Encrypter,
    cacheParam?: Cache
): Login => {
    const connection = connectionParam ? connectionParam : new MysqlAdapter()
    const inDatabaseRepositoryUser = inDatabaseRepositoryUserParam ? inDatabaseRepositoryUserParam : new UserRepositoryDatabase(connection)
    const hasher = hasherParam ? hasherParam : new BcryptAdapter(8)
    const encrypt = encryptParam ? encryptParam : new JsonwebtokenAdapter(`${process.env.SECRET_KEY}`)
    const cache = cacheParam ? cacheParam : CacheFactory.make()

    return new Login(inDatabaseRepositoryUser, hasher, encrypt, cache)
}