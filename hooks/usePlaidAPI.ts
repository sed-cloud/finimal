import { usePlaidAccessTokenStore } from "./usePlaidAccessTokenStore"
import { usePlaidAccounts } from "./usePlaidAccount"
import { usePlaidTransactions } from "./usePlaidTransactions"


export const usePlaidAPI = () => {
    const { accessTokens } = usePlaidAccessTokenStore()
    const { accounts, insights: accountsInsights } = usePlaidAccounts(accessTokens)
    const { transactions, transactionsInsights } = usePlaidTransactions(accessTokens)
    return { accounts, accountsInsights, transactions, transactionsInsights }
}