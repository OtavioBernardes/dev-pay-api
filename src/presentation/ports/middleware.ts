import { HttpResponse } from './http-response'

export interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}