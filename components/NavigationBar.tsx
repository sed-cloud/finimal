import React from 'react'
import { useAuth } from "../contexts/auth"


export const NavigationBar = () => {
    const { logout } = useAuth()

    return (
        <nav className='m-8 p-4 flex shadow-lg rounded-lg bg-white'>
            <a className='flex-1 text-stone-900 font-["Poppins"] text-4xl italic font-extrabold'>finimalist</a>
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
    )
}