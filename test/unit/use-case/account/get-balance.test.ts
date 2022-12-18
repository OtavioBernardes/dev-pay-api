import { faker } from '@faker-js/faker';
import { AccountRepositoryInMemory } from '../../../../src/external/database/inMemory/account-repository-in-memory';
import { GetBalance } from "../../../../src/use-cases/get-balance"

describe('UseCase: GetBalance', () => {
    const inMemoryDatabaseAccount = new AccountRepositoryInMemory()
    const useCaseGetBalance = new GetBalance(inMemoryDatabaseAccount)

    it("Deve retornar o saldo da conta", async () => {
        const account = {
            name: 'Otávio Bernardes',
            cpf: '11111111111',
            email: 'test@test.com',
            password: 'password0123'
        }

        // @ts-ignore
        const account_id = await inMemoryDatabaseAccount.save(1, account)
        const result = await useCaseGetBalance.execute(account_id);
        // @ts-ignore
        expect(result.value.balance).toEqual(0)
    })

    it("Deve retornar uma expection pois a conta não existe", async () => {
        const account_id = faker.datatype.number();
        const result = await useCaseGetBalance.execute(account_id)
        expect(result.value).toEqual("Account not found!")
    })
})