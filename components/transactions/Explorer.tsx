/**
 * Component to explore all loaded transactions, through searching and filtering
 * 
 */

import { usePlaidAPI } from "../../hooks/usePlaidAPI"
import { ColorManager } from "../../lib/colorManager"
import FilterTableHeader from "../table/FilterTableHeader"
import SortTableHeader from "../table/SortTableHeader"

type TransactionExplorerProps = {
}

const TransactionExplorer = ({ }: TransactionExplorerProps) => {
    const { transactions, TransactionAttributeAPI, TransactionFilterAPI, TransactionSortAPI, AccountUtility } = usePlaidAPI()
    const onFilterMerchant = (itemName: string) => {
        // item is filtered
        if (TransactionFilterAPI.merchants.includes(itemName)) {
            TransactionFilterAPI.removeMerchant(itemName)
        } else {
            TransactionFilterAPI.addMerchant(itemName)
        }
    }
    const onFilterAccount = (itemName: string) => {
        const accountId = TransactionAttributeAPI.accounts.find((v) => v.name === itemName)?.account_id
        if (!accountId) return
        if (TransactionFilterAPI.accounts.includes(accountId)) {
            TransactionFilterAPI.removeAccount(accountId)
        } else {
            TransactionFilterAPI.addAccount(accountId)
        }
    }
    const onFilterPaymentTypes = (itemName: string) => {
        if (TransactionFilterAPI.paymentTypes.includes(itemName)) {
            TransactionFilterAPI.removePaymentType(itemName)
        } else {
            TransactionFilterAPI.addPaymentType(itemName)
        }
    }
    const onFilterCategory = (itemName: string) => {
        if (TransactionFilterAPI.categories.includes(itemName)) {
            TransactionFilterAPI.removeCategory(itemName)
        } else {
            TransactionFilterAPI.addCategory(itemName)
        }
    }

    const onAmountSorted = () => {
        if (TransactionSortAPI.amountSortType === 'none') {
            TransactionSortAPI.sortAmountAscending()
        } else if (TransactionSortAPI.amountSortType === 'ascending') {
            TransactionSortAPI.sortAmountDescending()
        } else {
            TransactionSortAPI.removeAmountSorting()
        }

    }

    const onDateSorted = () => {
        if (TransactionSortAPI.dateSortType === 'none') {
            TransactionSortAPI.sortDateAscending()
        } else if (TransactionSortAPI.dateSortType === 'ascending') {
            TransactionSortAPI.sortDateDescending()
        } else {
            TransactionSortAPI.removeDateSorting()
        }
    }

    return (
        <div className="overflow-y-scroll bg-white rounded-xl shadow-lg p-4 max-h-page scrollbar">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th className="bg-white"></th>
                        <th className="bg-white">Name</th>
                        <th className="bg-white">
                            <SortTableHeader text='Amount' sortType={TransactionSortAPI.amountSortType} callback={onAmountSorted} />
                        </th>
                        <th className="bg-white">
                            <SortTableHeader text='Date' sortType={TransactionSortAPI.dateSortType} callback={onDateSorted} />
                        </th>
                        <th className='bg-white'>
                            <FilterTableHeader
                                text='Merchants'
                                items={TransactionAttributeAPI.merchants}
                                checkedItems={TransactionFilterAPI.merchants}
                                callback={onFilterMerchant}
                            />
                        </th>
                        <th className='bg-white'>

                            <FilterTableHeader
                                text='Payment Types'
                                items={TransactionAttributeAPI.paymentTypes}
                                checkedItems={TransactionFilterAPI.paymentTypes}
                                callback={onFilterPaymentTypes}
                            />
                        </th>
                        <th className="bg-white">
                            <FilterTableHeader
                                text='Categories'
                                items={TransactionAttributeAPI.categories}
                                checkedItems={TransactionFilterAPI.categories}
                                callback={onFilterCategory}
                            />
                        </th>
                        <th className='bg-white'>
                            <FilterTableHeader
                                text='Account'
                                items={TransactionAttributeAPI.accounts.map(item => item.name)}
                                checkedItems={TransactionFilterAPI.accounts}
                                callback={onFilterAccount}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((value, index) => {
                        return <tr className="border-b">
                            <th>{index + 1}</th>
                            <td>{value.name}</td>
                            <td>{value.amount.toLocaleString('en-US', { style: 'currency', currency: value.iso_currency_code ?? 'USD' })}</td>
                            <td>{value.date}</td>
                            <td>{value.merchant_name ?? 'n/a'}</td>
                            <td>
                                <div
                                    className={`
                                        badge
                                        bg-${ColorManager.paymentChannelToColor(value.payment_channel)}
                                        border-0
                                        font-semibold
                                        p-3
                                        mx-2
                                    `}
                                >
                                    {value.payment_channel}
                                </div>
                            </td>
                            <td>{value.category?.map((value, index) => {
                                return <div
                                    key={index}
                                    className={`
                                        badge
                                        bg-slate-500
                                        border-0
                                        font-semibold
                                        p-3
                                        mx-2
                                    `}
                                >{value}</div>
                            })}
                            </td>
                            <td><div
                                className={`
                                        badge
                                        bg-${ColorManager.accountTypeToColor(AccountUtility.accountIdToType(value.account_id))}
                                        border-0
                                        font-semibold
                                        p-3
                                        mx-2
                                    `}
                            >{AccountUtility.accountIdToName(value.account_id)}</div></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionExplorer