import { AccountRepository } from "src/domain/ports/account-repository";
import { left, right } from "../shared/index";
import { UseCase } from "./ports";

export class GetBalance implements UseCase {
    private accountRepo: AccountRepository;

    constructor(accountRepo: AccountRepository) {
        this.accountRepo = accountRepo;
    }

    async execute(account_id: number) {
        const account = await this.accountRepo.get(account_id)
        // @ts-ignore
        if (account.isLeft())
            return left("Account not found!")
        // @ts-ignore
        return right({ balance: account.value.balance })
    }
}