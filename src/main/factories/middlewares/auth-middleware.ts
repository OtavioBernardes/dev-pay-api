import { Controller } from "../../../presentation/ports";
import { AuthMiddleware } from "../../../presentation/middlewares/auth-middleware";
import { MakeDbLoadUserByToken } from "../use-cases/load-user-by-token";

export const makeAuthMiddleware = (): Controller => {
    return new AuthMiddleware(MakeDbLoadUserByToken())
}