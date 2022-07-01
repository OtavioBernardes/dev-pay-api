import { Account } from "../../domain/account/account";
import { Either, left, right } from "../../shared";
import { UseCase } from "../ports";
import { AccountRepository } from "./ports/account-repository";

export class CreditAccount implements UseCase {
    private accountRepo: AccountRepository

    constructor(accountRepo: AccountRepository) {
        this.accountRepo = accountRepo
    }

    async execute(data: Input): Promise<any> {
        const newAccountOrError: Either<String, Account> = Account.create()

        if (newAccountOrError.isLeft())
            return left(newAccountOrError.value)

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