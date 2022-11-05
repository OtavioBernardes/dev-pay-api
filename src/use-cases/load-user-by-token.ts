import { UseCase, Decrypter } from "./ports";
import { Cache } from "./ports/cache";

export class LoadUserByToken implements UseCase {
    private decrypter: Decrypter
    private cache: Cache

    constructor(
        decrypter: Decrypter,
        cache: Cache
    ) {
        this.decrypter = decrypter
        this.cache = cache
    }

    async execute(accessToken: string): Promise<any> {
        let token: string;      

        try {
            token = await this.cache.get(accessToken)
            token = await this.decrypter.decrypt(token)
        } catch (error) {
            return null
        }
        return token ? JSON.parse(token) : null
    }
}

