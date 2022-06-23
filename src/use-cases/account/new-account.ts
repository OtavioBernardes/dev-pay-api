import { User } from "../../domain/user"
import UserData from "../../domain/user/userData"
import { UseCase } from "../ports/use-case"
import { Either, left, right } from "../../shared"
import { Account } from "../../domain/account/account";

export class NewAccount implements UseCase {
    private repo: any;

    constructor(repo: any) {
        this.repo = repo;
    }

    async perform(user: UserData): Promise<any> {
        const newUserOrError: Either<String, User> = User.create(user)

        if (newUserOrError.isLeft())
            return left(newUserOrError.value)

        const newAccountOrError: Either<String, Account> = Account.create()

        return right(newUserOrError.value)
    }
}
