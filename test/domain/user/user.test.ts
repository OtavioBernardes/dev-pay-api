import { User } from "../../../src/domain/user"

test('Deve criar um usuario', () => {
    const user = User.create({
        name: 'Otávio Bernardes',
        email: 'teste@gmail.com',
        password: 'password0123',
        cpf: '11834997654'
    })
})