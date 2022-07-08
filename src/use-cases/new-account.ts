import { User } from "../domain/entity/user"
import { UseCase, Hasher } from "./ports"
import { Either, left, right } from "../shared"
import { Account } from "../domain/entity/account/account"
import { UserRepository } from "../domain/ports/user-repository"
import { AccountRepository } from "../domain/ports/account-repository"

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

    async execute(user: Input): Promise<any> {
        
        if (await this.userRepo.exists(user.cpf))
            return left('User already exists!')

        user.password = await this.hasher.hash(user.password)

        const newUserOrError: Either<String, User> = User.create(user)
        if (newUserOrError.isLeft())
            return left(newUserOrError.value)

        const userId = await this.userRepo.save(newUserOrError.value)

        const newAccountOrError: Either<String, Account> = Account.create(newUserOrError.value)
        if (newAccountOrError.isLeft())
            return left(newAccountOrError.value)

        const accountId = await this.accountRepo.save(userId, newAccountOrError.value)

        const Output: Output = {
            name: newUserOrError.value.name,
            email: newUserOrError.value.email as unknown as string,
            cpf: newUserOrError.value.cpf as unknown as string,
            account_id: accountId
        }
        return right(Output)
    }
}

type Input = {
    name: string,
    email: string,
    cpf: string,
    password: string
}

type Output = {
    name: string,
    email: string,
    cpf: string,
    account_id: number
}