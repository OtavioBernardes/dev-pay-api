import { AccountRepository } from "src/domain/ports/account-repository";
import { UseCase } from "./ports";

export class GetBalance implements UseCase {
    private accountRepo: AccountRepository;

    constructor(accountRepo: AccountRepository) {
        this.accountRepo = accountRepo;
    }

    async execute(account_id: number) {
        const account = await this.accountRepo.get(account_id)
        if (!account)
            throw new Error("Account not found!")
        // @ts-ignore
        return account.value.balance
    }
}