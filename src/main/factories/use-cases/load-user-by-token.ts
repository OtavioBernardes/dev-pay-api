import { LoadUserByToken } from "../../../use-cases/load-user-by-token"
import { JsonwebtokenAdapter } from "../../../external/cryptography/jsonwebtoken-adapter"

export const MakeDbLoadUserByToken = (): LoadUserByToken => {
    const encrypt = new JsonwebtokenAdapter(`${process.env.SECRET_KEY}`)
    return new LoadUserByToken(encrypt)
}