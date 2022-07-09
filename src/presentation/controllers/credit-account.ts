import { badRequest, ok } from "../helpers";
import { HttpRequest } from "../ports"
import { CreditAccount } from "../../use-cases/credit-account";

export class CreditAccountController {
    private usecase: CreditAccount;

    constructor(usecase: CreditAccount) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
        const validate = await this.validate(req.body)

        if (!validate.isValid)
            return badRequest({ message: validate.message })

        const res = await this.usecase.execute(req.body);

        if (res.isLeft())
            return badRequest({ message: res.value })

        return ok();
    }

    async validate(data: any): Promise<{ isValid: boolean; message: string }> {
        const messages: string[] = []

        if (!data.amount || typeof data.amount !== 'number')
            messages.push('Amount is invalid!')

            if (!data.to || typeof data.to !== 'number')
            messages.push('To is invalid')

        if (messages.length > 0)
            return { isValid: false, message: messages.reduce((message) => message) }

        return { isValid: true, message: '' }
    }
}