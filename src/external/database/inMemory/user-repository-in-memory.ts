import { User } from '../../../domain/entity/user';
import { UserRepository } from '../../../domain/ports/user-repository';

export class UserRepositoryInMemory implements UserRepository {
    users: any

    constructor() {
        this.users = []
    }

    exists(cpf: string): Promise<boolean> {
        return this.users.some((user: any) => user.cpf === cpf)
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.users.filter((user: any) => user.email === email)[0]
    }

    save(user: User): Promise<any> {
        return this.users.push(user)
    }
}