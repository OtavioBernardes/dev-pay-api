import { NewAccount } from "../../../use-cases/account/new-account";

export const makeDbNewAccount = (): NewAccount => {
    const usecase = new NewAccount({})
    return usecase
}