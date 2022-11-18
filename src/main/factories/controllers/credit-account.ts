import { Controller } from "../../../presentation/ports";
import { MakeDbCreditAccount } from "../use-cases/credit-account";
import { CreditAccountController } from "../../../presentation/controllers/credit-account";

export const MakeCreditAccountController = (useCaseCredit?: any): Controller => {
    return new CreditAccountController(useCaseCredit ? useCaseCredit : MakeDbCreditAccount())
}