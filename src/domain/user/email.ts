import { Either, left, right } from '../../main/shared'

export class Email {
    public readonly email: string

    private constructor(email: string) {
        this.email = email
    }

    public static create(email: string): Either<string, Email> {
        if (this.validate(email))
            return right(new Email(email))
        return left('Invalid email')
    }

    public static validate(email: string): boolean {
        const emailValid = /\S+@\S+\.\S+/;
        return emailValid.test(email)
    }
}