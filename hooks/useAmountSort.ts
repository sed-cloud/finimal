/**
 * hook to sort transactions by amount
 */





import { Transaction } from "plaid"
import { useEffect, useState } from "react"


export const useAmountSort = (data: Transaction[] | undefined) => {
    const [sortType, setSortType] = useState<'none' | 'ascending' | 'descending'>('none')
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(data)


    const sortAmountAscending = () => {
        setSortType('ascending')
    }

    const sortAmountDescending = () => {
        setSortType('descending')
    }

    const removeAmountSorting = () => {
        setSortType('none')
    }

    useEffect(() => {
        if (data === undefined) return;
        if (sortType === 'ascending') {
            setTransactions([...data].sort((a, b) => { return a.amount - b.amount }))
        } else if (sortType === 'descending') {
            setTransactions([...data].sort((a, b) => { return b.amount - a.amount }))
        } else {
            setTransactions(data)
        }
    }, [data, sortType])

    return { sortAmountAscending, sortAmountDescending, removeAmountSorting, dataSortedByAmount: transactions, sortType }
}