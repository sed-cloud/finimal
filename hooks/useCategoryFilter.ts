import { Transaction } from "plaid"
import { useEffect, useState } from "react"

function filterTransactionsByCategoryName(transactions: Transaction[] | undefined, categories: string[]) {
    if (categories.length === 0 || !transactions) {
        return transactions
    }
    const list = []

    for (const transaction of transactions) {
        for (const category of categories) {
            if (transaction.category?.includes(category)) {
                list.push(transaction)
                break
            }
        }
    }

    return list
}

export const useCategoryFilter = (data: Transaction[] | undefined, allCategories: string[]) => {
    const [categories, setCategories] = useState<string[]>([])
    const addCategory = (merchant: string) => {
        if (!allCategories.includes(merchant)) return
        setCategories(old => [...old, merchant])
    }
    const removeCategory = (merchant: string) => {
        setCategories(old => old.filter(value => value !== merchant))
    }
    const resetCategory = () => {
        setCategories([])
    }

    const [transactions, setTransactions] = useState<Transaction[] | undefined>([])

    useEffect(() => {
        setTransactions(filterTransactionsByCategoryName(data, categories))
    }, [data, categories])

    return { addCategory, removeCategory, resetCategory, dataFilteredByCategory: transactions, categories }
}