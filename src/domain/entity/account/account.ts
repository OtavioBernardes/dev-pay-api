import { left, right } from "../../../shared"
import { User } from "../user"

export class Account {
    user: User
    balance: number = 0

    private constructor(user: User) {
        this.user = user
    }

    public static create(user: User): any {
        return right(new Account(user))
    }

    public getBalance(): number {
        return this.balance
    }

    public credit(amount: number): any {
        if (this.validate(amount))
            return right(this.balance += amount)
        return left('Invalid credit amount')
    }

    public debit(amount: number): void {
        if (this.validate(amount))
            this.balance -= amount
    }

    validate(amount: number): Boolean {
        return amount > 0
    }
}