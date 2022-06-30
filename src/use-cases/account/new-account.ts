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

    async execute(user: Input): Promise<any> {

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

        const usuario = await this.userRepo.save(userData)
        await this.accountRepo.save({ user_id: usuario.insertId, balance: newAccountOrError.value.balance })

        const Output: Output = {
            name: newUserOrError.value.name,
            email: newUserOrError.value.email as unknown as string,
            cpf: newUserOrError.value.cpf as unknown as string
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
}