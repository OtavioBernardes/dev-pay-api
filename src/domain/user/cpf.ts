export class Cpf {
    public readonly cpf: string

    private constructor(cpf: string) {
        this.cpf = cpf
    }

    public static create(cpf: string): any {
        if (this.validate(cpf))
            return new Cpf(cpf)
    }

    public static validate(cpf: string): boolean {
        return cpf.length === 11
    }
}