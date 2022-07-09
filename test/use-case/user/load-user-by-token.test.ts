import { JsonwebtokenAdapter } from "../../../src/external/cryptography/jsonwebtoken-adapter"
import { LoadUserByToken } from "../../../src/use-cases/load-user-by-token"

const input = {
    name: 'Otávio Bernardes',
    email: 'test@test.com'
}

describe('UseCase: LoadUserByToken', () => {
    const jsonwebtoken = new JsonwebtokenAdapter('my-secret-test')
    const usecase = new LoadUserByToken(jsonwebtoken)

    it('Deve retornar um objeto com email e name', async () => {
        const token = await jsonwebtoken.encrypt(JSON.stringify(input))
        const result = await usecase.execute(token)
        expect(result).toEqual(input)
    })

    it('Deve retornar null pois o token é invalido', async () => {
        const result = await usecase.execute('1123%\zxsadas')
        expect(result).toBeNull()
    })
})
