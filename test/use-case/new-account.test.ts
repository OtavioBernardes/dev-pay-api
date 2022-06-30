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

const Output = {
    name: 'Otávio Bernardes',
    cpf: '11111111111',
    email: 'test@test.com',
}

describe('UseCase: New Account', () => {
    const inMemoryDatabaseRepositoryUser = new UserRepositoryInMemory()
    const inMemoryDatabaseAccount = new AccountRepositoryInMemory()

    const hasher = new BcryptAdapter(8)
    const account = new NewAccount(inMemoryDatabaseRepositoryUser, inMemoryDatabaseAccount, hasher)

    it('Deve criar um usuário e uma conta na plataforma', async () => {
        const result = await account.execute(input)
        expect(result.value).toEqual(Output)
    })

    it('Deve retornar um exception pois o usuário já está cadastrado', async () => {
        const result = await account.execute(input)
        expect(result.isLeft()).toEqual(true)
    })

    it('Deve retornar uma expection pois o cpf do usuário é invalido', async () => {
        const account = new NewAccount(inMemoryDatabaseRepositoryUser, inMemoryDatabaseAccount, hasher)
        const result = await account.execute({
            name: 'Otávio Bernardes',
            cpf: '111111111',
            email: 'test@test.com',
            password: 'password0123'
        })
        
        expect(result.isLeft()).toEqual(true)
        expect(result.value).toEqual('Invalid cpf')
    })
})