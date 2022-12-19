import axios from 'axios';
import { faker } from '@faker-js/faker';

describe("NewAccount", () => {
    it("should return success to created a new account", async () => {
        const user = {
            name: "John",
            email: faker.internet.email(),
            cpf: faker.random.numeric(11),
            password: "password"
        }

        const result = await axios.post("http://localhost:3333/api/account", user)

        expect(result.status).toEqual(201)
        expect(result.data.cpf).toEqual(user.cpf)
        expect(result.data.email).toEqual(user.email)
    })

    it("should return failed because already exist account", async () => {
        const user = {
            name: "John",
            email: faker.internet.email(),
            cpf: faker.random.numeric(11),
            password: "password"
        }

        await axios.post("http://localhost:3333/api/account", user)
        await expect(axios.post("http://localhost:3333/api/account", user)).rejects.toThrow("Request failed with status code 400")
    })

    it("should return bad request because email is invalid", async () => {
        const user = {
            name: "John",
            email: faker.random.alpha(),
            cpf: faker.random.numeric(11),
            password: "password"
        }

        await expect(axios.post("http://localhost:3333/api/account", user)).rejects.toThrow("Request failed with status code 400")
    })

    it("should return bad request because cpf is invalid", async () => {
        const user = {
            name: "John",
            email: faker.internet.email(),
            cpf: faker.random.numeric(10),
            password: "password"
        }

        await expect(axios.post("http://localhost:3333/api/account", user)).rejects.toThrow("Request failed with status code 400")
    })
})