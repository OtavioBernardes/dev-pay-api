import { Controller } from "../../../presentation/ports";
import { LoginController } from "../../../presentation/controllers/login";
import { MakeDbLogin } from "../use-cases/login"

export const MakeLoginController = (): Controller => {
    const controller = new LoginController(MakeDbLogin())
    return controller
}