import { left, right } from "../../shared"
import { Cpf, Email } from "./value-object"
import { UserData } from "./"

export class User {
	public readonly name: string
	public readonly email: Email
	public readonly cpf: Cpf
	public readonly password: string

	private constructor(
		name: string,
		email: Email,
		cpf: Cpf,
		password: string
	) {
		this.name = name
		this.email = email
		this.cpf = cpf
		this.password = password
	}

	public static create(user: UserData): any {
		const emailOrError = Email.create(user.email)
		const cpfOrError = Cpf.create(user.cpf)

		if (cpfOrError.isLeft())
			return left(cpfOrError.value)

		if (emailOrError.isLeft())
			return left(emailOrError.value)

		const cpf: Cpf = cpfOrError.value.cpf as unknown as Cpf
		const email: Email = emailOrError.value.email as unknown as Email

		return right(new User(user.name, email, cpf, user.password))
	}
}