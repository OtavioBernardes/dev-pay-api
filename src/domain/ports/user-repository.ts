import { User } from "../entity/user"

export interface UserRepository {
    exists(cpf: string): Promise<boolean>
    getUserByEmail(email: string): Promise<User>
    save(user: User): Promise<number>
}
