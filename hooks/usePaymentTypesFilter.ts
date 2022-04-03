import { Transaction } from "plaid"
import { useEffect, useState } from "react"

function filterTransactionsByPaymentType(transactions: Transaction[] | undefined, paymentTypes: string[]) {
    if (paymentTypes.length === 0 || !transactions) {
        return transactions
    }
    const list = []

    for (const transaction of transactions) {
        for (const merchant of paymentTypes) {
            if (transaction.payment_channel === merchant) {
                list.push(transaction)
                break
            }
        }
    }

    return list
}

export const usePaymentTypesFilter = (data: Transaction[] | undefined, allPaymentTypes: string[]) => {
    const [paymentTypes, setPaymentTypes] = useState<string[]>([])
    const addPaymentType = (paymentType: string) => {
        if (!allPaymentTypes.includes(paymentType)) return
        setPaymentTypes(old => [...old, paymentType])
    }
    const removePaymentType = (paymentType: string) => {
        setPaymentTypes(old => old.filter(value => value !== paymentType))
    }
    const resetPaymentTypes = () => {
        setPaymentTypes([])
    }

    const [transactions, setTransactions] = useState<Transaction[] | undefined>([])

    useEffect(() => {
        setTransactions(filterTransactionsByPaymentType(data, paymentTypes))
    }, [data, paymentTypes])

    return { addPaymentType, removePaymentType, resetPaymentTypes, dataFilteredByPaymentType: transactions, paymentTypes }
}