import { Middleware, HttpResponse } from '../ports/'
import { forbiddenRequest, ok, serverError } from "../helpers";
import { LoadUserByToken } from '../../use-cases/load-user-by-token';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadUserByToken: LoadUserByToken,
    private readonly role?: string
  ) { }

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      let { accessToken } = request

      if (accessToken) {
        const account = await this.loadUserByToken.execute(accessToken.substring(7, accessToken.length), this.role)
        if (account) {
          return ok({ accountId: account.id })
        }
      }

      return forbiddenRequest({ message: 'You do not have permission to access this resource.' })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
