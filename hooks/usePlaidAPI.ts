import { usePlaidAccessTokenStore } from "./usePlaidAccessTokenStore"
import { usePlaidAccounts } from "./usePlaidAccount"
import { usePlaidTransactions } from "./usePlaidTransactions"


export const usePlaidAPI = () => {
    const { accessTokens } = usePlaidAccessTokenStore()
    const { accounts, insights: accountsInsights, AccountUtility } = usePlaidAccounts(accessTokens)
    const {
        transactions,
        transactionsInsights,
        TransactionAttributeAPI,
        TransactionFilterAPI,
        TransactionSortAPI
    } = usePlaidTransactions(accessTokens, accounts ? accounts : [])
    return {
        accounts,
        accountsInsights,
        AccountUtility,
        transactions,
        transactionsInsights,
        TransactionAttributeAPI,
        TransactionFilterAPI,
        TransactionSortAPI
    }

}