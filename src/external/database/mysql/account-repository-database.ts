import { Account } from '../../../domain/entity/account/account';
import { AccountRepository } from '../../../domain/ports/account-repository';
import { left, right } from '../../../shared';
import Connection from '../ports/connection';

export class AccountRepositoryDatabase implements AccountRepository {

    constructor(readonly connection: Connection) { }

    async save(user_id: number, account: Account): Promise<any> {
        const accountDb = await this.connection.query(`INSERT INTO account (user_id, balance) VALUES  (${user_id}, ${account.balance})`)
        return accountDb.insertId
    }

    credit(data: any): void {
        this.connection.query(`UPDATE account SET balance = (balance + ${data.amount}) WHERE ID = ${data.to}`)
    }

    async get(id: number): Promise<any> {
        const accountDb = await this.connection.query(`SELECT * FROM account INNER JOIN user on user.id = account.user_id where account.id = ${id}`)
        if (accountDb.length === 0)
            return left('Account not found!')

        const user = {
            name: accountDb.name,
            email: accountDb.email,
            cpf: accountDb.cpf,
            password: accountDb.password
        }

        return Account.create(user)
    }
}