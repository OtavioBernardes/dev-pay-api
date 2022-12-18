import { badRequest, ok } from "../helpers";
import { HttpRequest } from "../ports"
import { GetBalance } from "../../use-cases/get-balance";

export class GetBalanceController {
    private usecase: GetBalance;

    constructor(usecase: GetBalance) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
        const res = await this.usecase.execute(req.body);
        if (res.isLeft())
            return badRequest({ message: res.value })

        // @ts-ignore
        return ok(res.value);
    }
}