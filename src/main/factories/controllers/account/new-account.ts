import { Controller } from "../../../../presentation/ports";
import { makeDbNewAccount } from "../../use-cases/new-account";
import { NewAcccountController } from "../../../../presentation/controllers/new-account";

export const makeNewAcccountController = (): Controller => {
    const controller = new NewAcccountController(makeDbNewAccount())
    return controller
}