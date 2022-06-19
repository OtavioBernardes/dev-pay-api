import { Email } from "../../../src/domain/user/email"

test('Não deve criar um e-mail', () => {
	const email = Email.create('otavio.teste.com')
	expect(email).toBe(undefined)
})

test('Deve criar um e-mail', () => {
	const email = Email.create('otavio@teste.com')
	expect(email.email).toBe('otavio@teste.com')
})