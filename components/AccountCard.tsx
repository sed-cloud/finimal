import { AccountBase } from "plaid"

type AccountCardProps = {
    account: AccountBase
}
export const AccountCard = ({ account }: AccountCardProps) => {
    return (
        <div className="m-4 justify-start max-w-md">
            <div className="p-6 shadow-lg rounded-lg bg-white">
                <div className="flex flex-row h-12">
                    <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold flex-1'>{account.name}</h1>
                    <div>
                        <p className={`
                                        rounded-full
                                        ${account.type === 'depository' ? 'bg-emerald-600 text-emerald-100' : account.type === 'loan' || account.type === 'credit' ? 'bg-red-600 text-red-100' : 'bg-cyan-600 text-cyan-100'}
                                        font-bold
                                        px-2
                                        py-1
                                        font-["Poppins"]
                                        text-xs
                                        `}
                        >{account.subtype}</p>
                    </div>
                </div>

                <p className={`
                                ${account.type === 'depository' ? ' text-emerald-300' : account.type === 'loan' || account.type === 'credit' ? 'text-red-300' : 'text-cyan-300'}
                                font-["Poppins"] font-bold text-lg`}>
                    {account.balances.current?.toLocaleString('en-US')}
                </p>
                <div className="h-2"></div>
                <p className='text-stone-400 font-["Poppins"] text-sm'>
                    {account.official_name ? account.official_name : account.name}
                </p>
                <div className="h-4"></div>


                <div className="flex flex-row-reverse">
                    <button
                        className={`
                                    
                                    transition-all
                                    ease-in-out
                                    durration-300

                                    bg-stone-200
                                    text-stone-900
                                    px-4
                                    py-2
                                    font-["Poppins"]
                                    font-bold
                                    rounded-xl

                                    ${account.type === 'depository' ? 'hover:text-emerald-100' : account.type === 'loan' ? 'hover:text-red-100' : 'hover:text-cyan-100'}
                                    ${account.type === 'depository' ? 'hover:bg-emerald-600' : account.type === 'loan' ? 'hover:bg-red-600' : 'hover:bg-cyan-600'}
                                        `}
                        onClick={() => { }}>
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}