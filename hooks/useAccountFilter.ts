import { Transaction } from "plaid"
import { useEffect, useState } from "react"

function filterTransactionsByAccount(transactions: Transaction[] | undefined, accountIds: string[]) {
    if (accountIds.length === 0 || !transactions) {
        return transactions
    }
    const list = []

    for (const transaction of transactions) {
        for (const accountId of accountIds) {
            if (transaction.account_id === accountId) {
                list.push(transaction)
                break
            }
        }
    }

    return list
}

export const useAccountFilter = (data: Transaction[] | undefined, allAccountIds: string[]) => {
    const [accountIds, setAccountIds] = useState<string[]>([])
    const addAccount = (accountId: string) => {
        if (!allAccountIds.includes(accountId)) return
        setAccountIds(old => [...old, accountId])
    }
    const removeAccount = (accountId: string) => {
        setAccountIds(old => old.filter(value => value !== accountId))
    }
    const resetAccount = () => {
        setAccountIds([])
    }

    const [transactions, setTransactions] = useState<Transaction[] | undefined>([])

    useEffect(() => {
        setTransactions(filterTransactionsByAccount(data, accountIds))
    }, [data, accountIds])

    return { addAccount, removeAccount, resetAccount, dataFilteredByAccountId: transactions, accounts: accountIds }
}