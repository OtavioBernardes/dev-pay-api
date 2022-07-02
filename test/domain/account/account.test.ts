import { Account } from "../../../src/domain/entity/account/account"
import { User } from "../../../src/domain/entity/user"

const user = User.create({
    name: 'Otávio Bernardes',
    password: 'teste01',
    email: 'teste01@gmail.com',
    cpf: '11111111111'
})

test('Deve criar uma conta com saldo zerado', () => {
    const account = Account.create(user).value
    console.log(account)
    expect(account.getBalance()).toBe(0)
})

test('Deve creditar 100 reais em uma conta', () => {
    const account = Account.create(user).value
    account.credit(100)
    expect(account.getBalance()).toBe(100)
})

test('Não deve ser possivel creditar um valor negativo na conta', () => {
    const account = Account.create(user).value
    account.credit(-100)
    expect(account.getBalance()).toBe(0)
})

test('Deve debitar um valor na conta', () => {
    const account = Account.create(user).value
    account.credit(100)
    account.debit(50)
    expect(account.getBalance()).toBe(50)
})

test('Não deve debitar um valor negativo na conta', () => {
    const account = Account.create(user).value
    account.credit(100)
    account.debit(-50)
    expect(account.getBalance()).toBe(100)
})