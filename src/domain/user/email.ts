export class Email {
    public readonly email: string

    private constructor(email: string) {
        this.email = email
    }

    public static create(email: string): any {
        if (this.validate(email))
            return new Email(email)
    }

    public static validate(email: string): boolean {
        const emailValid = /\S+@\S+\.\S+/;
        return emailValid.test(email)
    }
}