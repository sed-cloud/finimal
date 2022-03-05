import React from 'react'
import { CryptoIcon } from './crypto'
import { Logout } from './Logout'
import { PlaidIcon } from './plaid'


export const NavigationBar = () => {

    return (
        <nav className='m-8 p-4 flex shadow-lg rounded-lg bg-white'>
            <a className='flex-1 text-stone-900 font-["Poppins"] text-4xl italic font-extrabold'>finimalist</a>
            <CryptoIcon disabled />
            <div className='w-8' />
            <PlaidIcon />
            <div className='w-8' />
            <Logout />
        </nav>
    )
}