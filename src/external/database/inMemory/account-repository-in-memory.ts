import { Account } from '../../../domain/entity/account/account';
import { AccountRepository } from '../../../domain/ports/account-repository';

export class AccountRepositoryInMemory implements AccountRepository {
    accounts: any

    constructor() {
        this.accounts = []
    }

    async save(user_id: number, account: Account): Promise<number> {
        const id = Math.floor(Math.random() * 65536);
        this.accounts.push({ ...account, id, user_id })
        return id
    }

    credit(data: any): void {
        this.accounts.map((account: any) => {
            if (account.id === data.id)
                account.balance += data.ammount
        })
    }

    async get(id: number): Promise<Account | undefined> {
        const account = this.accounts.filter((account: any) => account.id === id)[0]
        if (account)
            return Account.create(account.user)
        return undefined
    }
}