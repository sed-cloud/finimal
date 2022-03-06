import { Transaction } from "plaid"
import { useEffect, useState } from "react"

function filterTransactionsByMerchantName(transactions: Transaction[] | undefined, merchants: string[]) {
    if (merchants.length === 0 || !transactions) {
        return transactions
    }
    console.log(merchants)
    const list = []

    for (const transaction of transactions) {
        for (const merchant of merchants) {
            if (transaction.merchant_name === merchant) {
                list.push(transaction)
            }
        }
    }

    return list
}

export const useMerchantFilter = (data: Transaction[] | undefined, allMerchants: string[]) => {
    const [merchants, setMerchants] = useState<string[]>([])
    const addMerchant = (merchant: string) => {
        if (!allMerchants.includes(merchant)) return
        setMerchants(old => [...old, merchant])
    }
    const removeMerchant = (merchant: string) => {
        setMerchants(old => old.filter(value => value !== merchant))
    }
    const resetMerchant = () => {
        setMerchants([])
    }

    const [transactions, setTransactions] = useState<Transaction[] | undefined>([])

    useEffect(() => {
        setTransactions(filterTransactionsByMerchantName(data, merchants))
    }, [data, merchants])

    return { addMerchant, removeMerchant, resetMerchant, dataFilteredByMerchant: transactions, merchants }
}