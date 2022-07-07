import { Login } from "../../../../use-cases/user/login-user"
import { MysqlAdapter } from "../../../../external/database/adapters"
import { UserRepositoryDatabase } from "../../../../external/database/mysql"
import { BcryptAdapter } from "../../../../external/cryptography/bcrypt-adapter"
import { JsonwebtokenAdapter } from "../../../../external/cryptography/jsonwebtoken-adapter"

export const makeDbLogin = (): Login => {
    const connection = new MysqlAdapter()
    const inDatabaseRepositoryUser = new UserRepositoryDatabase(connection)
    const hasher = new BcryptAdapter(8)
    const encrypt = new JsonwebtokenAdapter(`${process.env.SECRET_KEY}`)
    return new Login(inDatabaseRepositoryUser, hasher, encrypt)
}