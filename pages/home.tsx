import React from "react";
import { useAuth } from "../contexts/auth";
import { CustomPage } from '../lib/custom-page';
import { usePlaid } from "./hooks/usePlaid";


const Home: CustomPage = () => {
    const { logout } = useAuth()
    const { PlaidLink, accounts } = usePlaid()

    let totalBalance = 0
    accounts.forEach((value) => {
        if (value.balances.current) {
            if (value.type === 'loan') { totalBalance -= value.balances.current }
            else { totalBalance += value.balances.current }
        }
    })

    return (
        <div className='m-4'>
            <nav className='m-8 p-4 flex shadow-lg rounded-lg bg-stone-50'>
                <a className='flex-1 text-stone-900 font-["Poppins"] text-4xl italic font-extrabold'>finimal</a>
                <div className='w-8' />
                <button className='
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

                hover:bg-pink-600
                hover:text-pink-50
                '
                    onClick={() => logout('/')}>
                    logout
                </button>
            </nav>

            <div className="m-8">
                <div className="p-6 shadow-lg rounded-lg bg-stone-50">
                    <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold flex-1'>Dashboard</h1>
                    <div className="h-4"></div>

                    <p className={`${totalBalance >= 0 ? ' text-emerald-300' : 'text-red-300'} font-["Poppins"] font-bold text-lg`}>
                        ${totalBalance.toLocaleString('en-US')}
                    </p>

                </div>
            </div>

            <div className='m-4 grid grid-flow-row-dense grid-cols-4'>
                {accounts.map((value) => {
                    return (
                        <div className="m-4 justify-start max-w-md">
                            <div className="p-6 shadow-lg rounded-lg bg-stone-50">
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
                                    ${value.balances.current?.toLocaleString('en-US')}
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
                    <div className="p-6 shadow-lg rounded-lg bg-stone-50">
                        <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold flex-1'>Load Account</h1>
                        <div className="h-4"></div>
                        <p className='text-stone-400 font-["Poppins"] text-sm'>
                            You are allow to connect as many bank and credit card accounts as you like
                        </p>
                        <div className="h-8"></div>
                        <div className="flex flex-row-reverse">
                            {PlaidLink}
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