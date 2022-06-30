import { AccountRepository } from '../../../use-cases/account/ports/account-repository';

export class AccountRepositoryInMemory implements AccountRepository {
    account: any

    constructor() {
        this.account = []
    }

    save(account: any): Promise<any> {
       return this.account.push(account)
    }
}