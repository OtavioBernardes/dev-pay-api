import axios from 'axios';
import { faker } from '@faker-js/faker';
import { userInfo } from 'os';

describe("Credit account", () => {
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

    it("should return 200 because credit with success", async () => {
        const login = (
            await axios.post("http://localhost:3333/api/user/login", {
                email: account.email,
                password: passwordAccount
            })
        ).data

        const result = await axios.post("http://localhost:3333/api/account/credit", {
            amount: faker.datatype.float(),
            to: account.account_id
        }, {

            headers: { authorization: `bearer ${login.token}` }
        })

        expect(result.status).toEqual(200)
    })

    it("should return 400 because account to credit does not exists", async () => {
        const login = (
            await axios.post("http://localhost:3333/api/user/login", {
                email: account.email,
                password: passwordAccount
            })
        ).data

        const result = await axios.post("http://localhost:3333/api/account/credit", {
            amount: faker.datatype.float(),
            to: faker.datatype.number({ min: 99 })
        }, {

            headers: { authorization: `bearer ${login.token}` },
            validateStatus: () => true
        })

        expect(result.status).toEqual(400)
        expect(result.data.message).toEqual("Account not found!")
    })

    it("should return 400 because bad request", async () => {
        const login = (
            await axios.post("http://localhost:3333/api/user/login", {
                email: account.email,
                password: passwordAccount
            })
        ).data

        const result = await axios.post("http://localhost:3333/api/account/credit", {
            amount: faker.datatype.float(),
        }, {

            headers: { authorization: `bearer ${login.token}` },
            validateStatus: () => true
        })

        expect(result.status).toEqual(400)
        expect(result.data.message).toEqual("To is invalid")
    })

    it("should return 403 because toke is invalid", async () => {
        const result = await axios.post("http://localhost:3333/api/account/credit", {
            amount: faker.datatype.float(),
        }, {

            headers: { authorization: `bearer ${faker.random.alphaNumeric(15)}` },
            validateStatus: () => true
        })

        expect(result.status).toEqual(403)
    })
})