import { Account } from "../../../src/domain/account/account"

test('Deve criar uma conta com saldo zerado', () => {
    const account = Account.create()
    expect(account.getBalance()).toBe(0)
})

test('Deve creditar 100 reais em uma conta', () => {
    const account = Account.create()
    account.credit(100)
    expect(account.getBalance()).toBe(100)
})

test('Não deve ser possivel creditar um valor negativo na conta', () => {
    const account = Account.create()
    account.credit(-100)
    expect(account.getBalance()).toBe(0)
})

test('Deve debitar um valor na conta', () => {
    const account = Account.create()
    account.credit(100)
    account.debit(50)
    expect(account.getBalance()).toBe(50)
})

test('Não deve debitar um valor negativo na conta', () => {
    const account = Account.create()
    account.credit(100)
    account.debit(-50)
    expect(account.getBalance()).toBe(100)
})