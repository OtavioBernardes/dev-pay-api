import { Controller } from "../../../presentation/ports";
import { MakeDbNewAccount } from "../use-cases/new-account";
import { NewAcccountController } from "../../../presentation/controllers/new-account";

export const MakeNewAccountController = (
    paramUseCase?: any
): Controller => {
    const controller = new NewAcccountController(
        paramUseCase ? paramUseCase : MakeDbNewAccount()
    )
    return controller
}