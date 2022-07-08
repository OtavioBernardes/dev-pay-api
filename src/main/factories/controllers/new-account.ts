import { Controller } from "../../../presentation/ports";
import { MakeDbNewAccount } from "../use-cases/new-account";
import { NewAcccountController } from "../../../presentation/controllers/new-account";

export const MakeNewAccountController = (): Controller => {
    const controller = new NewAcccountController(MakeDbNewAccount())
    return controller
}