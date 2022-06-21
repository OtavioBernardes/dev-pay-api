import { Email } from "../../../src/domain/user/email"

test('Não deve criar um e-mail', () => {
	const email = Email.create('otavio.teste.com')
	expect(email.isLeft()).toBe(true)
})

test('Deve criar um e-mail', () => {
	const email = Email.create('otavio@teste.com')
	expect(email.isRight()).toBe(true)
})