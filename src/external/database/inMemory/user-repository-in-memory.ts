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
        const userDb = this.users.filter((user: any) => user.email === email)
        if (userDb.length === 0)
            throw new Error("User not found");

        return userDb[0]
    }

    save(user: User): Promise<any> {
        return this.users.push(user)
    }
}