import { UserRepository } from '../../../use-cases/account/ports/user-repository';

export class UserRepositoryInMemory implements UserRepository {
    users: any

    constructor() {
        this.users = []
    }

    exists(cpf: string): Promise<boolean> {
        return this.users.some((user: any) => user.cpf === cpf)
    }

    save(user: any): Promise<any> {
        return this.users.push(user)
    }
}