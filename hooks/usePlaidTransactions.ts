import { Transaction } from "plaid"
import useSWR from "swr"
import { useTransactionInsights } from "./useInsights"


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
    const { data } = useSWR([`/api/plaid/transactions/`, accessTokens], loadTransactions, { refreshInterval: 5_000})
    const { insights } = useTransactionInsights(data)
    return { transactions: data, transactionsInsights: insights }
}