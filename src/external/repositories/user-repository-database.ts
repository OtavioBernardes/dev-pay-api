import { UserData } from '../../domain/user'
import { UserRepository } from '../../use-cases/account/ports/user-repository'
import Connection from './ports/connection';

export class UserRepositoryDatabase implements UserRepository {

    constructor(readonly connection: Connection) { }

    save(user: UserData): Promise<any> {
        const query = `INSERT INTO user (name, cpf, password) VALUES  ('${user.name}', '${user.cpf})', '${user.password}')`
        return this.connection.query(query)
    }

    async exists(cpf: string): Promise<any> {
        const query = `SELECT * FROM user WHERE cpf = '${cpf}'`
        return this.connection.query(query)
    }
}