import { created } from "../helpers";
import { HttpRequest } from "../ports"

export class NewAcccountController {
    private usecase: any;

    constructor(usecase: any) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
        return created(req)
    }

}