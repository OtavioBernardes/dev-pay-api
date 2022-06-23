import { UserData } from '../../domain/user'
import { UserRepository } from '../../use-cases/account/ports/user-repository'
import Connection from './ports/connection';

export class UserRepositoryDatabase implements UserRepository {

    constructor(readonly connection: Connection) { }

    save(user: UserData): Promise<any> {
        const query = `INSERT INTO user (name, cpf, password) VALUES  ('${user.name}', '${user.cpf}', '${user.password}')`
        return this.connection.query(query)
    }

    async exists(cpf: string): Promise<boolean> {
        const query = `SELECT * FROM user WHERE cpf = '${cpf}'`
        const result = await this.connection.query(query)
        return result.length !== 0
    }
}