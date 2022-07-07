import { Controller } from "../../../../presentation/ports";
import { LoginController } from "../../../../presentation/controllers/login";
import { makeDbLogin } from "../../use-cases/user/login"

export const makeNewLogin = (): Controller => {
    const controller = new LoginController(makeDbLogin())
    return controller
}