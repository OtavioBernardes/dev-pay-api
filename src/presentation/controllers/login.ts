import { badRequest, created, forbiddenRequest } from "../helpers";
import { HttpRequest } from "../ports"
import { Login } from "../../use-cases/user/login-user";

export class LoginController {
    private usecase: Login;

    constructor(usecase: Login) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {
    
        if (!await this.validate(req.body))
            return badRequest({ message: 'Invalid request!' })

        const res = await this.usecase.execute(req.body);

        if (res.isLeft())
            return forbiddenRequest({ message: res.value })

        return created(res.value);
    }

    async validate(data: any): Promise<boolean> {
        const emailValidate = !!data.email && typeof data.email === 'string'
        const passwordValidate = !!data.password && typeof data.password === 'string'
        return emailValidate && passwordValidate
    }
}