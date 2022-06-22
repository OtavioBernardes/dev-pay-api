import { User } from "../../domain/user"
import UserData from "../../domain/user/userData"
import { UseCase } from "../ports/use-case"
import { Either, left, right } from "../../shared"

export class NewAccount implements UseCase {
    private repo: any;

    constructor(repo: any) {
        this.repo = repo;
    }

    async perform(user: UserData): Promise<any> {
        console.log('Estou no use-case')
        return user
    }
}
