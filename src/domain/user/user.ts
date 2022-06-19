import { Cpf, Email } from "./"
import UserData from "./userData"

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

		if(!cpfOrError || !emailOrError)
			return undefined

		return new User(user.name, emailOrError.email, cpfOrError.cpf, user.password)
	}

}