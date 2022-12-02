import supertest from "supertest";
import { mockServer } from "../helper";
import { MakeLoginController } from '../../src/main/factories/controllers/login'
import { MakeDbLogin } from "../../src/main/factories/use-cases/login";
import { UserRepository } from "../../src/domain/ports/user-repository";
import { Cache } from "../../src/use-cases/ports/cache";
import Connection from "../../src/external/database/ports/connection";
import { Hasher } from "../../src/use-cases/ports";

const repository = {
    exists: jest.fn(),
    getUserByEmail: jest.fn()
}

const cache = {
    set: jest.fn(),
}

const hasher = {
    compare: jest.fn().mockImplementation(() => true)
}

describe("LoginUseCaseController", () => {
    let server: supertest.SuperTest<supertest.Test>;

    beforeAll(async () => {

        const useCase = MakeDbLogin(
            {} as Connection,
            repository as unknown as UserRepository,
            hasher as unknown as Hasher,
            undefined,
            cache as unknown as Cache
        )
        const loginController = MakeLoginController(useCase)
        server = await mockServer({
            loginUseCase: loginController
        });
    });

    it("Should return 200 with token", async () => {
        hasher.compare.mockImplementationOnce(() => true)
        repository.getUserByEmail.mockImplementationOnce(() => {
            return { name: "test", email: "test@example.com", password: "test@123" }
        })

        return await new Promise((done) => {
            server
                .post('/api/user/login')
                .send({
                    email: "test@example.com",
                    password: "test@123"
                })
                .expect(200)
                .end((_, req) => {
                    expect(req.body).toHaveProperty("token");
                    done(true);
                });
        });
    })

    it("Should return 400 because bad request", async () => {
        return await new Promise((done) => {
            server
                .post('/api/user/login')
                .send({
                    email: "test@example.com"
                })
                .expect(400)
                .end((_, req) => {
                    expect(req.statusCode).toEqual(400)
                    expect(req.body.message).toEqual("Password is invalid")
                    done(true);
                });
        });
    })

    it("Should return 403 because password doesn't match", async () => {
        hasher.compare.mockImplementationOnce(() => false)
        repository.getUserByEmail.mockImplementationOnce(() => {
            return { name: "test", email: "test@example.com", password: "test@123" }
        })

        return await new Promise((done) => {
            server
                .post('/api/user/login')
                .send({
                    email: "test@example.com",
                    password: "test@123"
                })
                .expect(200)
                .end((_, req) => {
                    expect(req.statusCode).toEqual(403)
                    done(true);
                });
        });
    })
})