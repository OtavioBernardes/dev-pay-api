import { adaptMiddleware } from '../adapters'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export const auth = adaptMiddleware(makeAuthMiddleware())
