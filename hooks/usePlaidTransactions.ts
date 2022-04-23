import useSWR from "swr"
import { AccountBase, Transaction } from "plaid"
import { useTransactionInsights } from "./useInsights"
import { useMerchantFilter } from "./useMerchantFilter"
import { useMerchants } from "./useMerchants"
import { useCategories } from "./useCategories"
import { useCategoryFilter } from "./useCategoryFilter"
import { useAccountFilter } from "./useAccountFilter"
import { useTimeRangeFilter } from "./useTimeRangeFilter"
import { usePaymentTypes } from "./usePaymentType"
import { usePaymentTypesFilter } from "./usePaymentTypesFilter"
import { useAmountSort } from "./useAmountSort"
import { useDateSort } from "./useDateSort"


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

export const usePlaidTransactions = (accessTokens: string[], allAccounts: AccountBase[]) => {
    const { data } = useSWR([`/api/plaid/transactions/`, accessTokens], loadTransactions, { refreshInterval: 5_000 })

    const { merchants: allMerchants } = useMerchants(data)
    const { categories: allCategories } = useCategories(data)
    const { paymentTypes: allPaymentTypes } = usePaymentTypes(data)

    const {
        addMerchant,
        removeMerchant,
        resetMerchant,
        dataFilteredByMerchant,
        merchants: filteredMerchants
    } = useMerchantFilter(data, allMerchants)

    const {
        addCategory,
        removeCategory,
        resetCategory,
        dataFilteredByCategory,
        categories: filteredCategories
    } = useCategoryFilter(dataFilteredByMerchant, allCategories)

    const {
        addAccount,
        removeAccount,
        resetAccount,
        dataFilteredByAccountId,
        accounts: filteredAccounts
    } = useAccountFilter(dataFilteredByCategory, allAccounts ? allAccounts.map(value => value.account_id) : [])

    const {
        setTimeRange,
        resetTimeRange,
        dataFilteredByTimeRange,
        timeRange
    } = useTimeRangeFilter(dataFilteredByAccountId)

    const {
        addPaymentType,
        removePaymentType,
        resetPaymentTypes,
        dataFilteredByPaymentType,
        paymentTypes: filteredPaymentTypes
    } = usePaymentTypesFilter(dataFilteredByTimeRange, allPaymentTypes)

    const {
        sortAmountAscending,
        sortAmountDescending,
        removeAmountSorting,
        dataSortedByAmount,
        sortType: amountSortType
    } = useAmountSort(dataFilteredByPaymentType)

    const {
        sortDateAscending,
        sortDateDescending,
        removeDateSorting,
        dataSortedByDate,
        sortType: dateSortType
    } = useDateSort(dataSortedByAmount)

    const { insights } = useTransactionInsights(dataSortedByDate)

    const TransactionAttributeAPI = {
        merchants: allMerchants,
        categories: allCategories,
        paymentTypes: allPaymentTypes,
        accounts: allAccounts
    }

    const TransactionFilterAPI = {
        addMerchant,
        removeMerchant,
        resetMerchant,
        merchants: filteredMerchants,

        addCategory,
        removeCategory,
        resetCategory,
        dataFilteredByCategory,
        categories: filteredCategories,

        addAccount,
        removeAccount,
        resetAccount,
        dataFilteredByAccountId,
        accounts: filteredAccounts,

        setTimeRange,
        resetTimeRange,
        dataFilteredByTimeRange,
        timeRange,

        addPaymentType,
        removePaymentType,
        resetPaymentTypes,
        dataFilteredByPaymentType,
        paymentTypes: filteredPaymentTypes
    }

    const TransactionSortAPI = {
        sortAmountAscending,
        sortAmountDescending,
        removeAmountSorting,
        dataSortedByAmount,
        amountSortType,

        sortDateAscending,
        sortDateDescending,
        removeDateSorting,
        dataSortedByDate,
        dateSortType

    }

    return {
        transactions: dataSortedByDate,
        transactionsInsights: insights,
        TransactionAttributeAPI,
        TransactionFilterAPI,
        TransactionSortAPI
    }
}

