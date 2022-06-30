export interface UseCase {
	execute(request: any): Promise<any>
}
