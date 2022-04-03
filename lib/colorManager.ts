import { AccountType, TransactionPaymentChannelEnum } from "plaid";

export namespace ColorManager {

    export function accountTypeToColor(accountType: AccountType) {

        switch (accountType) {
            case AccountType.Loan:
            case AccountType.Credit:
                return 'red-600'
            case AccountType.Brokerage:
            case AccountType.Investment:
                return 'stone-800'
            case AccountType.Depository:
                return 'emerald-600'
            default:
                return 'stone-400'
        }

    }

    export function paymentChannelToColor(paymentChannel: TransactionPaymentChannelEnum) {
        switch (paymentChannel) {
            case TransactionPaymentChannelEnum.InStore:
                return 'cyan-600'
            case TransactionPaymentChannelEnum.Online:
                return 'amber-300'
            case TransactionPaymentChannelEnum.Other:
                return 'purple-600'
            default: 
                return 'stone-400'
        }
    }

}