import { AccountBase, TransactionBase } from "plaid"

export type PlaidState = {
    items: {
        [accountId: string]: {
            accessToken: string
            account: AccountBase
            itemId: string
            transactions: TransactionBase[]
        }
    },
    stats: {[statName: string]: number}
}
export type AddConnectionAction = {
    type: 'addConnection',
    payload: {
        accessToken: string
    }
}
export type LoadAccountAction = {
    type: 'loadAccounts',
}
export type LoadTransactionsAction = {
    type: 'loadTransactions',
    payload: {
        accountId: string
    }
}
export type PlaidAction =
    AddConnectionAction |
    LoadAccountAction |
    LoadTransactionsAction |
    {
        type: 'invalidate'
    }
