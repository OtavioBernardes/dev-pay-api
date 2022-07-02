import { Either, left, right } from '../../../shared'

export class Cpf {
    public readonly cpf: string

    private constructor(cpf: string) {
        this.cpf = cpf
    }

    public static create(cpf: string): Either<string, Cpf> {
        if (this.validate(cpf))
            return right(new Cpf(cpf))
        return left('Invalid cpf')
    }

    public static validate(cpf: string): boolean {
        return !!cpf && cpf.length === 11
    }
}