import { UserData } from "../../../domain/user";

export interface UserRepository {
    exists(cpf: string): Promise<boolean>
    save(user: UserData): Promise<any>
}