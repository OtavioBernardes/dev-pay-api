import { created } from "../helpers";
import { HttpRequest } from "../ports"
import { NewAccount } from "../../use-cases/account/new-account";

export class NewAcccountController {
    private usecase: NewAccount;

    constructor(usecase: NewAccount) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
        this.usecase.perform(req.body);
        return created(req)
    }

}