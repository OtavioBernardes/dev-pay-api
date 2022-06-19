import UserData from "./userData"

export class User {
	public readonly name: string
	public readonly email: string
	public readonly cpf: string
	public readonly password: string

	private constructor(
		name: string,
		email: string,
		cpf: string,
		password: string
	) {
		this.name = name
		this.email = email
		this.cpf = cpf
		this.password = password
	}

	public static create(user: UserData): any {
		return new User(user.name, user.email, user.cpf, user.password)
	}

}