import supertest from "supertest"
import { mockServer } from "../helper";
import { MakeDbNewAccount } from "../../src/main/factories/use-cases/new-account";
import { MakeNewAccountController } from '../../src/main/factories/controllers/new-account';
import Connection from "../../src/external/database/ports/connection";
import { UserRepository } from "../../src/domain/ports/user-repository";
import { AccountRepository } from "../../src/domain/ports/account-repository";
import { Hasher } from "../../src/use-cases/ports";

const repositoryUser = {
    exists: jest.fn(),
    save: jest.fn(),
}

const repositoryAccount = {
    save: jest.fn()
}

const hasher = {
    hash: jest.fn().mockImplementation((text: string) => text)
}

describe ("NewAccountUseCaseController", () => {
    let server: supertest.SuperTest<supertest.Test>;

    beforeAll(async () => {
        const useCase = MakeDbNewAccount(
            {} as Connection,
            repositoryUser as unknown as UserRepository,
            repositoryAccount as unknown as AccountRepository,
            hasher as unknown as Hasher
        )
        const newAccountController = MakeNewAccountController(useCase)

        server=  await mockServer({
            newAccountUseCase: newAccountController
        })
    })

    it("Should return 201 with success create account", async () => {
        const accountId = 1
        repositoryUser.exists.mockImplementationOnce(() => false)
        repositoryUser.save.mockImplementationOnce(() => 100)
        repositoryAccount.save.mockImplementationOnce(() => accountId)

        return new Promise((done) => {
            server
            .post("/api/account")
            .send({
                name: "John",
                email: "john@example.com",
                cpf: "11111111111",
                password: "password"
            })
            .expect(201)
            .end((_, req) => {
                expect(req.statusCode).toEqual(201)
                expect(req.body).toEqual({
                    account_id: accountId,
                    name: "John",
                    email: "john@example.com",
                    cpf: "11111111111"
                })
                done(true)
            })
        })
    })

    it("Should return 400 because user already exists", async () => {
        repositoryUser.exists.mockImplementationOnce(() => true)

        return new Promise((done) => {
            server
            .post("/api/account")
            .send({
                name: "John",
                email: "john@example.com",
                cpf: "11111111111",
                password: "password"
            })
            .expect(400)
            .end((_, req) => {
                expect(req.statusCode).toEqual(400)
                done(true)
            })
        })
    })

    it("Should return 400 because invalid cpf", async () => {
        repositoryUser.exists.mockImplementationOnce(() => false)

        return new Promise((done) => {
            server
            .post("/api/account")
            .send({
                name: "John",
                email: "john@example.com",
                cpf: "meuCpf",
                password: "password"
            })
            .expect(400)
            .end((_, req) => {
                expect(req.statusCode).toEqual(400)
                done(true)
            })
        })
    })

    it("Should return 400 because invalid email", async () => {
        repositoryUser.exists.mockImplementationOnce(() => false)

        return new Promise((done) => {
            server
            .post("/api/account")
            .send({
                name: "John",
                email: "john@example",
                cpf: "11111111111",
                password: "password"
            })
            .expect(400)
            .end((_, req) => {
                expect(req.statusCode).toEqual(400)
                done(true)
            })
        })
    })

    it("Should return 400 because invalid email", async () => {
        repositoryUser.exists.mockImplementationOnce(() => false)

        return new Promise((done) => {
            server
            .post("/api/account")
            .send({
                name: "John",
                email: "john@example",
                cpf: "11111111111",
                password: "password"
            })
            .expect(400)
            .end((_, req) => {
                expect(req.statusCode).toEqual(400)
                done(true)
            })
        })
    })
})