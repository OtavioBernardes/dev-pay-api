import { User, UserData } from "../../domain/user"
import { UseCase, Hasher } from "../ports"
import { Either, left, right } from "../../shared"
import { Account } from "../../domain/account/account"
import { UserRepository } from "./ports/user-repository"
import { AccountRepository } from "./ports/account-repository"

export class NewAccount implements UseCase {
    private userRepo: UserRepository
    private accountRepo: AccountRepository
    private hasher: Hasher;

    constructor(
        userRepo: UserRepository,
        accountRepo: AccountRepository,
        hasher: Hasher
    ) {
        this.userRepo = userRepo
        this.accountRepo = accountRepo
        this.hasher = hasher
    }

    async perform(user: UserData): Promise<any> {

        if (await this.userRepo.exists(user.cpf))
            return left('User already exists!')

        const newUserOrError: Either<String, User> = User.create(user)
        if (newUserOrError.isLeft())
            return left(newUserOrError.value)

        const newAccountOrError: Either<String, Account> = Account.create()
        if (newAccountOrError.isLeft())
            return left(newAccountOrError.value)

        const userData = newUserOrError.value as unknown as UserData

        userData.password = await this.hasher.hash(userData.password)
        const newUser = await this.userRepo.save(userData)

        await this.accountRepo.save({ user_id: newUser.insertId, balance: newAccountOrError.value.balance })
        return right(newUserOrError.value)
    }
}
