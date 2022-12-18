import supertest from 'supertest';
import { Router } from "express";
import { adaptRoute } from "../src/main/adapters";
import express from 'express'

type MockServerOptions = {
    loginUseCase?: any;
    creditUseCase?: any;
    newAccountUseCase?: any;
    getBalanceUseCase?: any
}

const routes = async (options: MockServerOptions): Promise<Router> => {
    const router = Router();

    router.post('/api/user/login', adaptRoute(options.loginUseCase));
    router.post('/api/account/credit', adaptRoute(options.creditUseCase));
    router.post('/api/account', adaptRoute(options.newAccountUseCase));
    router.get('/api/account/balance', adaptRoute(options.getBalanceUseCase));

    return router;
};

export const mockApp = async (options: MockServerOptions): Promise<any> => {

    const app = express()
    app.use(express.json())
    app.use(await routes(options))

    return app;
};

export const mockServer = async (options: MockServerOptions): Promise<supertest.SuperTest<supertest.Test>> => {
    const app = await mockApp(options);
    return supertest(app);
};
