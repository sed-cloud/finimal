import { AccountBase, Transaction, TransactionBase } from "plaid";
import { StatsEngine } from "../lib/stats";


export const useAccountInsights = (accounts?: AccountBase[]) => {
    if (!accounts) return { insights: {} }
    const insights = StatsEngine.computeAccountStats(accounts)
    return { insights }
}

export const useTransactionInsights = (transactions?: Transaction[]) => {
    if (!transactions) return { insights: {} }
    const insights = StatsEngine.computeTransactionStats(transactions)
    return { insights }
}