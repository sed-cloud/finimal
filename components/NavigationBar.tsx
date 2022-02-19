import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAuth } from "../contexts/auth"
import { usePlaid } from '../contexts/plaid'
import { CryptoIcon } from './crypto'


export const NavigationBar = () => {
    const { PlaidIconLink, nextConnectionName } = usePlaid()
    const { logout } = useAuth()

    return (
        <nav className='m-8 p-4 flex shadow-lg rounded-lg bg-white'>
            <a className='flex-1 text-stone-900 font-["Poppins"] text-4xl italic font-extrabold'>finimalist</a>
            <CryptoIcon disabled />
            <div className='w-8' />
            <PlaidIconLink connectionName={nextConnectionName()} />
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

                hover:bg-red-600
                hover:text-red-50
                '
                onClick={() => logout('/')}>
                logout
            </button>
        </nav>
    )
}