import { AccountType } from "plaid";

export namespace ColorManager {

    export function accountTypeToColor(accountType: AccountType) {

        switch (accountType) {
            case AccountType.Loan:
            case AccountType.Credit:
                return 'red-300'
            case AccountType.Brokerage:
            case AccountType.Investment:
                return 'stone-800'
            case AccountType.Depository:
                return 'emerald-300'
            default:
                return 'stone-400'
        }

    }

}