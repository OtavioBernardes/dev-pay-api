import { Controller } from "../../../presentation/ports";
import { MakeDbGetBalance } from "../use-cases/get-balance";
import { GetBalanceController } from "../../../presentation/controllers/get-balance";

export const MakeGetBalanceController = (useCaseGetBalance?: any): Controller => {
    return new GetBalanceController(useCaseGetBalance ? useCaseGetBalance : MakeDbGetBalance())
}