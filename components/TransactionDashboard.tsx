import { usePlaidAPI } from "../hooks/usePlaidAPI";
import { camelToTitle } from "../lib/textLib";
import { Field } from "./Field";
import MultiSelect from "./MultiSelect";
import TransactionCard from "./TransactionCard";


const TransactionDashboard = () => {
    const { transactions, transactionsInsights, TransactionAttributeAPI, TransactionFilterAPI } = usePlaidAPI()

    const onFilterMerchant = (itemName: string) => {
        // item is filtered
        if (TransactionFilterAPI.merchants.includes(itemName)) {
            TransactionFilterAPI.removeMerchant(itemName)
        } else {
            TransactionFilterAPI.addMerchant(itemName)
        }
    }

    const onFilterCategory = (itemName: string) => {
        if (TransactionFilterAPI.categories.includes(itemName)) {
            TransactionFilterAPI.removeCategory(itemName)
        } else {
            TransactionFilterAPI.addCategory(itemName)
        }
    }

    return (
        <div className="p-6 shadow-lg rounded-lg bg-white overflow-y-auto">
            <div className="flex flex-row">
                <h1 className='text-stone-900 font-["Poppins"] text-3xl font-extrabold italic flex-1'>transactions</h1>
                <div className="flex flex-row gap-4">
                    <MultiSelect text={'Filter by Category'} items={TransactionAttributeAPI.categories.map((item) => {
                        return { text: item, checked: TransactionFilterAPI.categories.includes(item) }
                    })} callback={onFilterCategory} />

                    <MultiSelect text={'Filter by Merchant'} items={TransactionAttributeAPI.merchants.map((item) => {
                        return { text: item, checked: TransactionFilterAPI.merchants.includes(item) }
                    })} callback={onFilterMerchant} />
                </div>
            </div>

            <div className="h-4"></div>

            {transactionsInsights.totalTransactions > 0 && <div className={`grid grid-rows-1 grid-cols-6`}>
                {Object.keys(transactionsInsights).map((value, index) => {
                    return <Field
                        key={index}
                        text={camelToTitle(value)}
                        value={transactionsInsights[value] === undefined ? '-' : transactionsInsights[value].toLocaleString('en-US')}
                        valueColor={'text-neutral'}
                    />
                })}
            </div>
            }

            {(!transactionsInsights.totalTransactions || transactionsInsights.totalTransactions === 0) &&
                <h1>No Recorded Transactions</h1>
            }

            <div className={`grid grid-cols-2`}>
                {transactions?.map((transaction, index) => {
                    return <TransactionCard key={index} transaction={transaction} />
                })}


            </div>


        </div>
    );
}

export default TransactionDashboard;