import React, { useEffect, useState } from "react";
import { CustomPage } from '../lib/custom-page';
import { Field } from "./components/Field";
import { NavigationBar } from "./components/NavigationBar";
import { usePlaid } from "../contexts/plaid";


const Home: CustomPage = () => {
    const { PlaidConnectionLink, nextConnectionName, accounts } = usePlaid()
    const [totalBalance, setTotalBalance] = useState(0)
    const [liquidBalance, setLiquidBalance] = useState(0)

    useEffect(() => {
        if (accounts.length <= 0) {
            setTotalBalance(0)
            return
        }

        let total = 0
        let liquid = 0
        accounts.forEach((value) => {
            if (value.balances.current) {
                if (value.type === 'loan') {
                    total -= value.balances.current
                }
                else {
                    total += value.balances.current
                    if (value.balances.available) liquid += value.balances.available // only avaliable assets are considered liquid
                }
            }
        })
        setTotalBalance(total)
        setLiquidBalance(liquid)
    }, [accounts])


    return (
        <div className='m-4'>
            <NavigationBar />

            <div className="m-8">
                <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold flex-1'>dashboard</h1>
                    <div className="h-4"></div>

                    <Field
                        text={'Net Worth'}
                        value={accounts.length === 0 ? '-' : totalBalance.toLocaleString('en-US')}
                        valueColor={`${totalBalance > 0 ? ' text-emerald-300' : totalBalance === 0 ? 'text-stone-400' : 'text-red-300'}`}
                    />

                    <Field
                        text={'Liquid Assets'}
                        value={accounts.length === 0 ? '-' : liquidBalance.toLocaleString('en-US')}
                        valueColor={`${liquidBalance > 0 ? ' text-emerald-300' : liquidBalance === 0 ? 'text-stone-400' : 'text-red-300'}`}
                    />

                </div>
            </div>

            <div className='m-4 grid grid-flow-row-dense grid-cols-4'>
                {accounts.map((value) => {
                    return (
                        <div className="m-4 justify-start max-w-md">
                            <div className="p-6 shadow-lg rounded-lg bg-white">
                                <div className="flex flex-row h-12">
                                    <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold flex-1'>{value.name}</h1>
                                    <div>
                                        <p className={`
                                        rounded-full
                                        ${value.type === 'depository' ? 'bg-emerald-600 text-emerald-100' : value.type === 'loan' ? 'bg-red-600 text-red-100' : 'bg-cyan-600 text-cyan-100'}
                                        font-bold
                                        px-2
                                        py-1
                                        font-["Poppins"]
                                        text-xs
                                        `}
                                        >{value.subtype}</p>
                                    </div>
                                </div>

                                <p className={`
                                ${value.type === 'depository' ? ' text-emerald-300' : value.type === 'loan' ? 'text-red-300' : 'text-cyan-300'}
                                font-["Poppins"] font-bold text-lg`}>
                                    {value.balances.current?.toLocaleString('en-US')}
                                </p>
                                <div className="h-2"></div>
                                <p className='text-stone-400 font-["Poppins"] text-sm'>
                                    {value.official_name ? value.official_name : value.name}
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

                                    ${value.type === 'depository' ? 'hover:text-emerald-100' : value.type === 'loan' ? 'hover:text-red-100' : 'hover:text-cyan-100'}
                                    ${value.type === 'depository' ? 'hover:bg-emerald-600' : value.type === 'loan' ? 'hover:bg-red-600' : 'hover:bg-cyan-600'}
                                        `}
                                        onClick={() => { }}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="m-4 max-w-md">
                    <div className="p-6 shadow-lg rounded-lg bg-white">
                        <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold flex-1'>Load Account</h1>
                        <div className="h-4"></div>
                        <p className='text-stone-400 font-["Poppins"] text-sm'>
                            You are allow to connect as many bank and credit card accounts as you like
                        </p>
                        <div className="h-8"></div>
                        <div className="flex flex-row-reverse">
                            {PlaidConnectionLink(nextConnectionName())}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

Home.requiresAuth = true
Home.redirectUnauthenticatedTo = '/'

export default Home