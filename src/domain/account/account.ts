export class Account {
    balance: number = 0

    private constructor() { }

    public static create(): any {
        return new Account()
    }

    public getBalance(): number {
        return this.balance
    }

    public credit(amount: number): void {
        if (this.validate(amount))
            this.balance += amount
    }

    public debit(amount: number): void {
        if (this.validate(amount))
            this.balance -= amount
    }

    validate(amount: number): Boolean {
        return amount > 0
    }

}