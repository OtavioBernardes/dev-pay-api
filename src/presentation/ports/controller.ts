import { HttpResponse } from "."

export interface Controller<T = any> {
	handle: (request: T) => Promise<HttpResponse>
}
