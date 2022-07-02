import { User } from "../entity/user"

export interface UserRepository {
    exists(cpf: string): Promise<boolean>
    save(user: User): Promise<number>
}
