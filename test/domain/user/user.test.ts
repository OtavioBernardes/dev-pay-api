import { User } from "../../../src/domain/user"

test('Não deve criar um usuario pois o e-mail é invalido', () => {
    const user = User.create({
        name: 'Otávio Bernardes',
        email: 'testegmail.com',
        password: 'password0123',
        cpf: '11834997654'
    })
    expect(user).toBe(undefined)
})

test('Deve criar um usuario', () => {
    const data = {
        name: 'Otávio Bernardes',
        email: 'teste@gmail.com',
        password: 'password0123',
        cpf: '11834997654'
    }
    const user = User.create(data)
    console.log(user)
    expect(user).toEqual(data)
})