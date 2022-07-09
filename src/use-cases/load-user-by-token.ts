import { UseCase, Decrypter } from "./ports";

export class LoadUserByToken implements UseCase {
    private decrypter: Decrypter

    constructor(
        decrypter: Decrypter
    ) {
        this.decrypter = decrypter
    }

    async execute(accessToken: string, role?: string): Promise<any> {
        let token: string

        try {
            token = await this.decrypter.decrypt(accessToken)
        } catch (error) {
            return null
        }

        return token ? JSON.parse(token) : null
    }
}

