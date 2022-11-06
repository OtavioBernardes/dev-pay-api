import { Controller } from "../../../presentation/ports";
import { LoginController } from "../../../presentation/controllers/login";
import { MakeDbLogin } from "../use-cases/login"

export const MakeLoginController = (useCaseLogin?: any): Controller => {
    const useCase = useCaseLogin ? useCaseLogin : MakeDbLogin()
    return new LoginController(useCase)
}