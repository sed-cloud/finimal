import { Transaction } from "plaid"
import { useEffect, useState } from "react"
import { TimeRange, TimeRangeEnum } from "../lib/timeLib"

function filterTransactionsByTimeRange(transactions: Transaction[] | undefined, timeRange: TimeRangeEnum) {
    if (timeRange === 'none' || timeRange === 'all time' || !transactions) {
        return transactions
    }
    const list = []

    for (const transaction of transactions) {
        if (new Date(Date.parse(transaction.authorized_date ?? '')) > TimeRange[timeRange]) {
            list.push(transaction)
        }
    }

    return list
}

export const useTimeRangeFilter = (data: Transaction[] | undefined) => {
    const [timeRange, setTimeRange] = useState<TimeRangeEnum>('all time')
    const resetTimeRange = () => {
        setTimeRange('all time')
    }

    const [transactions, setTransactions] = useState<Transaction[] | undefined>([])

    useEffect(() => {
        setTransactions(filterTransactionsByTimeRange(data, timeRange))
    }, [data, timeRange])

    return { setTimeRange, resetTimeRange, dataFilteredByTimeRange: transactions, timeRange }
}