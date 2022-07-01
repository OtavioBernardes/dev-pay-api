import { Controller } from "../../../../presentation/ports";
import { makeDbCreditAccount } from "../../use-cases/credit-account";
import { CreditAccountController } from "../../../../presentation/controllers/credit-account";

export const makeCreditAccountController = (): Controller => {
    return new CreditAccountController(makeDbCreditAccount())
}