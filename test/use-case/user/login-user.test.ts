import { BcryptAdapter } from "../../../src/external/cryptography/bcrypt-adapter"
import { JsonwebtokenAdapter } from "../../../src/external/cryptography/jsonwebtoken-adapter"
import { AccountRepositoryInMemory } from "../../../src/external/database/inMemory/account-repository-in-memory"
import { UserRepositoryInMemory } from "../../../src/external/database/inMemory/user-repository-in-memory"
import { NewAccount } from "../../../src/use-cases/account/new-account"
import { Login } from "../../../src/use-cases/user/login-user"

const input = {
    name: 'Otávio Bernardes',
    cpf: '11111111111',
    email: 'test@test.com',
    password: 'password0123'
}

describe('UseCase: Logging', () => {
    const inMemoryDatabaseRepositoryUser = new UserRepositoryInMemory()
    const inMemoryDatabaseAccount = new AccountRepositoryInMemory()

    const hasher = new BcryptAdapter(8)
    const encrypt = new JsonwebtokenAdapter('my-secret-test')

    const usecase_new_account = new NewAccount(inMemoryDatabaseRepositoryUser, inMemoryDatabaseAccount, hasher)
    const usecase = new Login(inMemoryDatabaseRepositoryUser, hasher, encrypt)

    it('Deve realizar o login na plataforma e retornar um token', async () => {
        await usecase_new_account.execute(input)

        const result = await usecase.execute({
            email: 'test@test.com',
            password: 'password0123'
        })
        expect(result.isRight()).toEqual(true)
        expect(typeof result.value.token).toEqual('string')
    })

    it('Deve retornar um erro pois os dados de login são invalidos', async () => {
        const result = await usecase.execute({
            email: 'test@test.com',
            password: 'password01234'
        })
        expect(result.isLeft()).toEqual(true)
        expect(result.value).toEqual('Password does not match!')
    })
})