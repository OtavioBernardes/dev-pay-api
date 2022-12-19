import { badRequest, ok } from "../helpers";
import { HttpRequest } from "../ports"
import { GetBalance } from "../../use-cases/get-balance";

export class GetBalanceController {
    private usecase: GetBalance;

    constructor(usecase: GetBalance) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
        const accountId = await this.getAccountId(req.params)
        if (!accountId)
            return badRequest({ message: "AccountId Param not found!" })

        const res = await this.usecase.execute(accountId as number);
        if (res.isLeft())
            return badRequest({ message: res.value })

        // @ts-ignore
        return ok(res.value);
    }

    async getAccountId(params: { accountId: string }): Promise<Boolean | Number> {
        const number = Number(params.accountId)
        return isNaN(number) ? false : number
    }
}