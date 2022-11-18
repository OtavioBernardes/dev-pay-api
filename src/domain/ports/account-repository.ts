import { Account } from "../entity/account/account"

export interface AccountRepository {
    save(user_id: number, account: Account): Promise<number>
    credit(account: any): void
    get(to: number): Promise<any>
)