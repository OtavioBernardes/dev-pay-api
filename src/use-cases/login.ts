import { UserRepository } from "../domain/ports/user-repository";
import { left, right } from "../shared";
import { Hasher, UseCase, Encrypter } from "./ports";
import { Cache } from "./ports/cache";

export class Login implements UseCase {
    private userRepo: UserRepository
    private hasher: Hasher
    private jwtHasher: Encrypter
    private cache: Cache

    constructor(
        userRepo: UserRepository,
        hasher: Hasher,
        jwtHasher: Encrypter,
        cache: Cache
    ) {
        this.userRepo = userRepo
        this.hasher = hasher
        this.jwtHasher = jwtHasher
        this.cache = cache
    }

    async execute(data: Input): Promise<any> {
        const user = await this.userRepo.getUserByEmail(data.email)

        if (await this.hasher.compare(data.password, user.password)) {
            const token: Output = {
                token: await this.jwtHasher.encrypt(
                    JSON.stringify({
                        name: user.name,
                        email: user.email
                    })
                )
            }

            await this.cache.set(token.token);
            return right(token)
        }
        return left('Password does not match!')
    }
}

type Input = {
    email: string,
    password: string
}

type Output = {
    token: string
}