import { badRequest, created, forbiddenRequest } from "../helpers";
import { HttpRequest } from "../ports"
import { Login } from "../../use-cases/login";

export class LoginController {
    private usecase: Login;

    constructor(usecase: Login) {
        this.usecase = usecase;
    }

    async handle(req: HttpRequest): Promise<any> {

        const validate = await this.validate(req.body)

        if (!validate.isValid)
            return badRequest({ message: validate.message })

        const res = await this.usecase.execute(req.body);

        if (res.isLeft()) 
            return forbiddenRequest({ message: res.value })
        
        return created(res.value);
    }

    async validate(data: any): Promise<{ isValid: boolean; message: string }> {
        const messages: string[] = []

        if (!data.email || typeof data.email !== 'string')
            messages.push('Email is invalid!')

        if (!data.password || typeof data.password !== 'string')
            messages.push('Password is invalid')

        if (messages.length > 0)
            return { isValid: false, message: messages.reduce((message) => message) }

        return { isValid: true, message: '' }
    }
}