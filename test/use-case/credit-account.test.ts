import { AccountRepositoryInMemory } from "../../src/external/database/inMemory/account-repository-in-memory"
import { CreditAccount } from "../../src/use-cases/account/credit-account"

const input = {
    amount: 100.00,
    to: 101
}

describe('UseCase: Credit Account', () => {
    const inMemoryDatabaseAccount = new AccountRepositoryInMemory()

    const usecase = new CreditAccount(inMemoryDatabaseAccount)
    it('Deve depositar um valor em uma conta', async () => {
        const result = await usecase.execute(input)
        expect(result.value).toEqual(input.amount)
    })
})