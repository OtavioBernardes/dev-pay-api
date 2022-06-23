import { Cpf } from "../../../domain/user";
import UserData from "../../../domain/user/userData";

export interface UserRepository {
    exists(cpf: Cpf): Promise<boolean>
    save(user: UserData): Promise<any>
}