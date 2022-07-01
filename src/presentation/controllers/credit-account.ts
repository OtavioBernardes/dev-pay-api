import { badRequest, created } from "../helpers";
import { HttpRequest } from "../ports"
import { CreditAccount } from "../../use-cases/account/credit-account";

export class CreditAccountController{
    private usecase: CreditAccount;

    constructor(usecase: CreditAccount) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
        const res = await this.usecase.execute(req.body);

        if (res.isLeft())
            return badRequest({ message: res.value })

        return created(res.value);
    }

}