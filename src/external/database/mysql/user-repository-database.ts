import { User } from '../../../domain/entity/user'
import { UserRepository } from '../../../domain/ports/user-repository'
import Connection from '../ports/connection';

export class UserRepositoryDatabase implements UserRepository {

    constructor(readonly connection: Connection) { }

    async exists(cpf: string): Promise<boolean> {
        const result = await this.connection.query(`SELECT * FROM user WHERE cpf = '${cpf}'`)
        return result.length !== 0
    }

    async save(user: User): Promise<any> {
        const userDb = await this.connection.query(
            `INSERT INTO user (name, cpf, password) VALUES  ('${user.name}', '${user.cpf}', '${user.password}')`
        )
        return userDb.insertId
    }
}