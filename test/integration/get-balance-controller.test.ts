import supertest from "supertest"
import { mockServer } from "../helper";
import { AccountRepository } from "../../src/domain/ports/account-repository"
import Connection from "../../src/external/database/ports/connection"
import { MakeDbGetBalance } from "../../src/main/factories/use-cases/get-balance"
import { MakeGetBalanceController } from "../../src/main/factories/controllers/get-balance"
import { Account } from "../../src/domain/entity/account/account";
import { Cpf, Email } from "../../src/domain/entity/user/value-object";
import { faker } from '@faker-js/faker';

const repository = {
    get: jest.fn(),
    credit: jest.fn()
}

describe("GetBalanceController", () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async () => {
        const useCase = MakeDbGetBalance(
            {} as Connection,
            repository as unknown as AccountRepository,
        )

        const useCaseRouter = MakeGetBalanceController(useCase)

        server = await mockServer({
            getBalanceUseCase: useCaseRouter
        })
    })

    it("should return 200 because get balance with success", async () => {
        const accountId = faker.random.numeric(5)
        const account = Account.create({
            name: "John",
            email: faker.internet.email() as unknown as Email,
            password: faker.random.alphaNumeric(),
            cpf: faker.random.numeric(11) as unknown as Cpf
        })

        repository.get.mockImplementation(() => account)
        return new Promise((done) => {
            server
                .get(`/api/account/${accountId}/balance`)
                .send()
                .expect(200)
                .end((_, req) => {
                    expect(req.statusCode).toEqual(200)
                    expect(req.body).toEqual({ balance: 0 })
                    done(true)
                })
        })
    })

    it("should return 400 because account does not exist", async () => {
        const accountId = faker.random.numeric(5)

        repository.get.mockImplementation(() => undefined)
        return new Promise((done) => {
            server
                .get(`/api/account/${accountId}/balance`)
                .send()
                .expect(200)
                .end((_, req) => {
                    expect(req.statusCode).toEqual(400)
                    expect(req.body).toEqual({ message: "Account not found!" })
                    done(true)
                })
        })
    })

    it("should return 400 because missing accountId params", async () => {
        return new Promise((done) => {
            server
                .get(`/api/account/invalidParams/balance`)
                .send()
                .expect(200)
                .end((_, req) => {
                    expect(req.statusCode).toEqual(400)
                    expect(req.body).toEqual({ message: "AccountId Param not found!" })
                    done(true)
                })
        })
    })
})