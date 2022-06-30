import { badRequest, created } from "../helpers";
import { HttpRequest } from "../ports"
import { NewAccount } from "../../use-cases/account/new-account";

export class NewAcccountController {
    private usecase: NewAccount;

    constructor(usecase: NewAccount) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
        const res = await this.usecase.execute(req.body);

        if (res.isLeft())
            return badRequest({ message: res.value })

        return created(res.value);
    }

}