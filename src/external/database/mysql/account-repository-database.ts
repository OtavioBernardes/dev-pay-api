import { AccountRepository } from '../../../use-cases/account/ports/account-repository';
import Connection from '../ports/connection';

export class AccountRepositoryDatabase implements AccountRepository {

    constructor(readonly connection: Connection) { }

    save(account: any): Promise<any> {
        const query = `INSERT INTO account (user_id, balance) VALUES  (${account.user_id}, ${account.balance})`
        return this.connection.query(query)
    }
}