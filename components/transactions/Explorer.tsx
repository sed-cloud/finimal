/**
 * Component to explore all loaded transactions, through searching and filtering
 * 
 */

import { Transaction } from "plaid"
import { usePlaidAPI } from "../../hooks/usePlaidAPI"
import { ColorManager } from "../../lib/colorManager"
import FilterIcon from "../FilterIcon"
import MultiSelect, { MultiSelectTableHeader } from "../MultiSelect"

type TransactionExplorerProps = {
}

const TransactionExplorer = ({ }: TransactionExplorerProps) => {
    const { transactions, TransactionAttributeAPI, TransactionFilterAPI, AccountUtility } = usePlaidAPI()
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
    return (
        <div className="overflow-y-scroll bg-white rounded-xl shadow-lg p-4 max-h-page scrollbar">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th className="bg-white"></th>
                        <th className="bg-white">Name</th>
                        <th className="bg-white">Amount</th>
                        <th className="bg-white">Date</th>
                        <th className="bg-white">
                            <MultiSelectTableHeader
                                text={'Merchant'}
                                items={TransactionAttributeAPI.merchants.map((item) => {
                                    return {
                                        text: item,
                                        checked: TransactionFilterAPI.merchants.includes(item)
                                    }
                                })}
                                callback={onFilterMerchant}
                            />
                        </th>
                        <th className="bg-white flex flex-row justify-between place-items-center">
                            <div className=" 
                            font-['Poppins']
                            font-bold
                            rounded-md

                            px-1
                            py-1
                            capitalize
                            "
                            >Payment Type</div>
                            <FilterIcon 
                            items={TransactionAttributeAPI.paymentTypes.map(item => {
                                return {
                                    text: item,
                                    checked: TransactionFilterAPI.paymentTypes.includes(item)
                                }
                            })}
                                callback={onFilterPaymentTypes}
                            />
                        </th>
                        <th className="bg-white">Categories</th>
                        <th className="bg-white">
                            <MultiSelectTableHeader
                                text={'Account'}
                                items={TransactionAttributeAPI.accounts.map((item) => {
                                    return {
                                        text: item.name,
                                        checked: TransactionFilterAPI.accounts.includes(item.account_id)
                                    }
                                })}
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