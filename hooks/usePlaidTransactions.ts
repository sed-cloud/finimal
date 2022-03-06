import useSWR from "swr"
import { Transaction } from "plaid"
import { useTransactionInsights } from "./useInsights"
import { useMerchantFilter } from "./useMerchantFilter"
import { useMerchants } from "./useMerchants"


async function loadTransactions(url: string, accessTokens: string[]): Promise<Transaction[]> {
    const requests: Promise<Transaction[]>[] = []
    for (const token of accessTokens) {
        requests.push(fetch(`${url}`,
            {
                method: 'POST',
                body: JSON.stringify({ accessToken: token })
            }
        ).then(response => response.json()))
    }

    return Promise.all(requests).then(response => {
        let list: Transaction[] = []
        for (const transactions of response) {
            list = list.concat(transactions)
        }
        return list
    })
}

export const usePlaidTransactions = (accessTokens: string[]) => {
    const { data } = useSWR([`/api/plaid/transactions/`, accessTokens], loadTransactions, { refreshInterval: 5_000 })
    const { merchants: allMerchants } = useMerchants(data)
    const { addMerchant, removeMerchant, resetMerchant, dataFilteredByMerchant, merchants: filteredMerchants } = useMerchantFilter(data, allMerchants)
    const { insights } = useTransactionInsights(dataFilteredByMerchant)

    const TransactionAttributeAPI = {
        merchants: allMerchants
    }

    const TransactionFilterAPI = {
        addMerchant,
        removeMerchant,
        resetMerchant,
        merchants: filteredMerchants
    }

    return { transactions: dataFilteredByMerchant, transactionsInsights: insights, TransactionAttributeAPI, TransactionFilterAPI }
}