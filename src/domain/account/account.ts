import { left, right } from "../../shared"

export class Account {
    balance: number = 0

    private constructor() { }

    public static create(): any {
        return right(new Account())
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