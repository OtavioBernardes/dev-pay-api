import { User, UserData } from "../../domain/user"
import { UseCase } from "../ports/use-case"
import { Either, left, right } from "../../shared"
import { Account } from "../../domain/account/account"
import { UserRepository } from "./ports/user-repository"

export class NewAccount implements UseCase {
    private repo: UserRepository;

    constructor(repo: UserRepository) {
        this.repo = repo;
    }

    /**
     * Proximos passos para o caso de uso orquestrar:
     * - Verificar se cpf já possui conta registrada na plataforma
     * - Condificação da senha
     * - Abertura da conta
     */

    async perform(user: UserData): Promise<any> {
        const newUserOrError: Either<String, User> = User.create(user)
        if (newUserOrError.isLeft())
            return left(newUserOrError.value)

        const newAccountOrError: Either<String, Account> = Account.create()
        if (newAccountOrError.isLeft())
            return left(newAccountOrError.value)

        await this.repo.save(newUserOrError.value as unknown as UserData)

        return right(newUserOrError.value)
    }
}
