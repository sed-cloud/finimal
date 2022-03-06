import { Transaction } from "plaid"
import { Field } from "./Field"

type TransactionCardProps = {
    transaction: Transaction
}
const TransactionCard = ({ transaction }: TransactionCardProps) => {
    return (
        <div className="card bg-stone-100 m-4 shadow-lg">
            <div className="p-4">
                <div className="flex flex-row justify-between">
                    <h2 className='card-title px-4 font-bold font-["Poppins"]'>{transaction.name}</h2>
                    <div className="px-4">
                        <div className="badge bg-green-600 border-0 font-semibold p-3 mx-2">{transaction.payment_channel}</div>
                        {transaction.category?.map(category => {
                            return <div className="badge bg-blue-600 border-0 font-semibold p-3 mx-2">{category}</div>
                        })}
                        {transaction.pending && <div className="badge bg-red-600 border-0 font-semibold p-3 mx-2">pending</div>}
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <Field
                        text={'Amount'}
                        value={transaction.amount.toLocaleString('en-US', { style: 'currency', currency: transaction.iso_currency_code ?? 'USD' })}
                        valueColor={'text-neutral'}
                    />
                    <Field
                        text={'Date'}
                        value={transaction.date}
                        valueColor={'text-neutral'}
                    />
                    {transaction.merchant_name &&
                        <Field
                            text={'Merchant Name'}
                            value={transaction.merchant_name}
                            valueColor={'text-neutral'}
                        />
                    }
                    {(!transaction.merchant_name) && <div className="w-full"></div>}
                    {(transaction.location.city || transaction.location.region || transaction.location.country) &&
                        <Field
                            text={'Location'}
                            value={transaction.location.city ?? transaction.location.region ?? transaction.location.country ?? 'n/a'}
                            valueColor={'text-neutral'}
                        />
                    }
                    {(!(transaction.location.city || transaction.location.region || transaction.location.country)) && <div className="w-full"></div>}
                </div>
            </div>
        </div>
    )
}

export default TransactionCard