import supertest from "supertest"
import { mockServer } from "../helper";
import { AccountRepository } from "../../src/domain/ports/account-repository"
import Connection from "../../src/external/database/ports/connection"
import { MakeDbCreditAccount } from "../../src/main/factories/use-cases/credit-account"
import { MakeCreditAccountController } from "../../src/main/factories/controllers/credit-account"
import { Account } from "../../src/domain/entity/account/account";
import { Cpf, Email } from "../../src/domain/entity/user/value-object";
import { left } from "../../src/shared"

const repository = {
    get: jest.fn(),
    credit: jest.fn()
}

describe("CreditAccountController", () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async () => {
        const useCase = MakeDbCreditAccount(
            {} as Connection,
            repository as unknown as AccountRepository,
        )

        const creditController = MakeCreditAccountController(useCase)

        server = await mockServer({
            creditUseCase: creditController
        })
    })

    it("should return 200 because credit with success", async () => {
        const account = Account.create({
            name: "John",
            email: "john@example.com" as unknown as Email,
            password: "0000",
            cpf: "123" as unknown as Cpf
        })

        repository.get.mockImplementation(() => account)
        return new Promise((done) => {
            server
                .post("/api/account/credit")
                .send({
                    amount: 100,
                    to: 2
                })
                .expect(200)
                .end((_, req) => {
                    expect(req.statusCode).toEqual(200)
                    expect(req.body).toBe("")
                    done(true)
                })
        })
    })

    it("should return 400 because account does not exists", async () => {

        repository.get.mockImplementation(() => left("Account not found"))
        return new Promise((done) => {
            server
                .post("/api/account/credit")
                .send({
                    amount: 100,
                    to: 1
                })
                .expect(400)
                .end((_, req) => {
                    expect(req.statusCode).toEqual(400)
                    expect(req.body).toHaveProperty("message")
                    expect(req.body.message).toBe('Account not found!')
                    done(true)
                })
        })
    })

    it("should return 400 because bad request", async () => {

        repository.get.mockImplementation(() => left("Account not found"))
        return new Promise((done) => {
            server
                .post("/api/account/credit")
                .send({
                    amount: 100
                })
                .expect(400)
                .end((_, req) => {
                    expect(req.statusCode).toEqual(400)
                    expect(req.body).toHaveProperty("message")
                    expect(req.body.message).toBe('To is invalid')
                    done(true)
                })
        })
    })
})