import { Account } from '../../../domain/account/account';
import { AccountRepository } from '../../../use-cases/account/ports/account-repository';

export class AccountRepositoryInMemory implements AccountRepository {
    account: any

    constructor() {
        this.account = []
    }

    save(account: any): Promise<any> {
        return this.account.push(account)
    }

    credit(data: any): void {
        this.account.map((account: any) => {
            if(account.id === data.id)
                account.balance += data.ammount
        })
    }
}