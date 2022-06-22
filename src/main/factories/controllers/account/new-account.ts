import { Controller } from "../../../../presentation/ports";
import { NewAcccountController } from "../../../../presentation/controllers/new-account";

export const makeNewAcccountController = (): Controller => {
    const controller = new NewAcccountController({})
    return controller
}