import { BcryptAdapter } from "../../src/external/cryptography/bcrypt-adapter";
import { AccountRepositoryInMemory } from "../../src/external/database/inMemory/account-repository-in-memory";
import { UserRepositoryInMemory } from "../../src/external/database/inMemory/user-repository-in-memory";
import { NewAccount } from "../../src/use-cases/account/new-account";

const input = {
    name: 'Otávio Bernardes',
    cpf: '11111111111',
    email: 'test@test.com',
    password: 'password0123'
}

describe('NewAccount - UseCase', () => {
    const inMemoryDatabaseRepositoryUser = new UserRepositoryInMemory()
    const inMemoryDatabaseAccount = new AccountRepositoryInMemory()

    const hasher = new BcryptAdapter(8)
    const account = new NewAccount(inMemoryDatabaseRepositoryUser, inMemoryDatabaseAccount, hasher)

    it('Deve criar um usuário e uma conta na plataforma', async () => {
        const result = await account.perform(input)
        expect(result.isRight()).toEqual(true)
    })

    it('Deve retornar um exception pois o usuário já está cadastrado', async () => {
        const result = await account.perform(input)
        expect(result.isLeft()).toEqual(true)
    })
})