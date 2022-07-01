export interface AccountRepository {
    save(account: any): Promise<any>
    credit(account: any): void
}