import axios from 'axios';
import { faker } from '@faker-js/faker';

describe("Get balance account", () => {
    let account: any;
    let passwordAccount: string

    beforeAll(async () => {
        passwordAccount = faker.random.alphaNumeric(11);

        const user = {
            name: "John",
            email: faker.internet.email(),
            cpf: faker.random.numeric(11),
            password: passwordAccount
        }

        account = (
            await axios.post("http://localhost:3333/api/account", user)
        ).data
    })

    it("should return 200 and balance account", async () => {
        const login = (
            await axios.post("http://localhost:3333/api/user/login", {
                email: account.email,
                password: passwordAccount
            },)
        ).data

        const result = await axios.get(`http://localhost:3333/api/account/${account.account_id}/balance`,
            {
                headers: { authorization: `bearer ${login.token}` }
            })

        expect(result.status).toEqual(200)
        expect(result.data).toEqual({ balance: 0 })
    })

    it("should return 400 because account not found", async () => {
        const fakeAccountId = faker.random.numeric(3)

        const login = (
            await axios.post("http://localhost:3333/api/user/login", {
                email: account.email,
                password: passwordAccount
            },)
        ).data

        const result = await axios.get(`http://localhost:3333/api/account/${fakeAccountId}/balance`,
            {
                headers: { authorization: `bearer ${login.token}` },
                validateStatus: () => true
            },
        )

        expect(result.status).toEqual(400)
        expect(result.data).toEqual({message: "Account not found!"})
    })

    it("should return 400 because param not found", async () => {
        const login = (
            await axios.post("http://localhost:3333/api/user/login", {
                email: account.email,
                password: passwordAccount
            },)
        ).data

        const result = await axios.get(`http://localhost:3333/api/account/fakeParam/balance`,
            {
                headers: { authorization: `bearer ${login.token}` },
                validateStatus: () => true
            },
        )

        expect(result.status).toEqual(400)
        expect(result.data).toEqual({message: "AccountId Param not found!"})
    })

    it("should return 403 because invalid token autorization", async () => {
        const token = faker.random.alphaNumeric(10)

        const result = await axios.get(`http://localhost:3333/api/account/fakeParam/balance`,
            {
                headers: { authorization: `bearer ${token}` },
                validateStatus: () => true
            },
        )

        expect(result.status).toEqual(403)
    })
})