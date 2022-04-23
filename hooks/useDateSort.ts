/**
 * hook to sort transactions by date
 */





import { Transaction } from "plaid"
import { useEffect, useState } from "react"


export const useDateSort = (data: Transaction[] | undefined) => {
    const [sortType, setSortType] = useState<'none' | 'ascending' | 'descending'>('none')
    const [transactions, setTransactions] = useState<Transaction[] | undefined>(data)


    const sortDateAscending = () => {
        setSortType('ascending')
    }

    const sortDateDescending = () => {
        setSortType('descending')
    }

    const removeDateSorting = () => {
        setSortType('none')
    }

    useEffect(() => {
        if (data === undefined) return;
        if (sortType === 'ascending') {
            setTransactions([...data].sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() }))
        } else if (sortType === 'descending') {
            setTransactions([...data].sort((a, b) => { return new Date(b.date).getTime() - new Date(a.date).getTime() }))
        } else {
            setTransactions(data)
        }
    }, [data, sortType])

    return { sortDateAscending, sortDateDescending, removeDateSorting, dataSortedByDate: transactions, sortType }
}