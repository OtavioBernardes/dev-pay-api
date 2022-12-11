import axios from 'axios';
import { faker } from '@faker-js/faker';

describe("Login", () => {
    it("should return success to login", async () => {
        const user = {
            name: "John",
            email: faker.internet.email(),
            cpf: faker.random.numeric(11),
            password: "password"
        }
        
        await axios.post("http://localhost:3333/api/account", user)

        const result = await axios.post("http://localhost:3333/api/user/login", {
            email: user.email,
            password: user.password
        })
        
        expect(result.status).toEqual(201)
        expect(result.data).toHaveProperty("token")
    })
})