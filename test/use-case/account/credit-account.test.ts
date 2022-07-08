import { BcryptAdapter } from "../../../src/external/cryptography/bcrypt-adapter"
import { AccountRepositoryInMemory } from "../../../src/external/database/inMemory/account-repository-in-memory"
import { UserRepositoryInMemory } from "../../../src/external/database/inMemory/user-repository-in-memory"
import { CreditAccount } from "../../../src/use-cases/credit-account"
import { NewAccount } from "../../../src/use-cases/new-account"

describe('UseCase: Credit Account', () => {
    const inMemoryDatabaseRepositoryUser = new UserRepositoryInMemory()
    const inMemoryDatabaseAccount = new AccountRepositoryInMemory()
    const hasher = new BcryptAdapter(8)

    const useCaseCreditAccount = new CreditAccount(inMemoryDatabaseAccount)
    const useCaseNewAccount = new NewAccount(inMemoryDatabaseRepositoryUser, inMemoryDatabaseAccount, hasher)

    it('Deve depositar um valor em uma conta', async () => {
        const account = await useCaseNewAccount.execute({
            name: 'Otávio Bernardes',
            cpf: '11111111111',
            email: 'test@test.com',
            password: 'password0123'
        })

        const result = await useCaseCreditAccount.execute({ amount: 100, to: account.value.account_id })
        expect(result.value).toEqual(100)
    })
})