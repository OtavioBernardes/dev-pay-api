export interface AccountRepository {
    save(account: any): Promise<any>
}