import { badRequest, ok } from "../helpers";
import { HttpRequest } from "../ports"
import { GetBalance } from "../../use-cases/get-balance";

export class GetBalanceController {
    private usecase: GetBalance;

    constructor(usecase: GetBalance) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
        console.log(req.params)
        if ( await this.validateParams(req.params))
            return badRequest({ message: "AccountId Param not found!" })

        const res = await this.usecase.execute(req.body);
        if (res.isLeft())
            return badRequest({ message: res.value })

        // @ts-ignore
        return ok(res.value);
    }

    async validateParams(params: { accountId: string }): Promise<Boolean> {
        const isNumber = Number(params.accountId)
        console.log(isNumber, isNaN(isNumber))
        return isNaN(isNumber) ? false : true
    }
}