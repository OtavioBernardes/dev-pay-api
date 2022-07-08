import { left, right } from "../shared";
import { UseCase } from "./ports";
import { AccountRepository } from "../domain/ports/account-repository";

export class CreditAccount implements UseCase {
    private accountRepo: AccountRepository

    constructor(accountRepo: AccountRepository) {
        this.accountRepo = accountRepo
    }

    async execute(data: Input): Promise<any> {
        const newAccountOrError = await this.accountRepo.get(data.to)

        if (newAccountOrError.isLeft())
            return left('Account not found!')

        const resultCredit = newAccountOrError.value.credit(data.amount)

        if (resultCredit.isLeft())
            return left(resultCredit.value)

        this.accountRepo.credit(data)
        return right(resultCredit.value)
    }
}

type Input = {
    amount: number,
    to: number
}