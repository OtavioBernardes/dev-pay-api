import { badRequest, ok } from "../helpers";
import { HttpRequest } from "../ports"
import { CreditAccount } from "../../use-cases/account/credit-account";

export class CreditAccountController {
    private usecase: CreditAccount;

    constructor(usecase: CreditAccount) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
        if (!await this.validate(req.body))
            return badRequest({ message: 'Invalid request!' })

        const res = await this.usecase.execute(req.body);

        if (res.isLeft())
            return badRequest({ message: res.value })

        return ok();
    }

    async validate(data: any): Promise<boolean> {
        const toValidate = !!data.to && typeof data.to === 'number'
        const amountValidate = !!data.amount && typeof data.amount === 'number'
        return toValidate && amountValidate
    }

}