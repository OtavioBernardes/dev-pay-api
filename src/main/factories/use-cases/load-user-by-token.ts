import { LoadUserByToken } from "../../../use-cases/load-user-by-token"
import { JsonwebtokenAdapter } from "../../../external/cryptography/jsonwebtoken-adapter"
import CacheFactory from "../cache/cache"

export const MakeDbLoadUserByToken = (): LoadUserByToken => {
    const encrypt = new JsonwebtokenAdapter(`${process.env.SECRET_KEY}`)
    const cache = CacheFactory.make()

    return new LoadUserByToken(encrypt, cache)
}