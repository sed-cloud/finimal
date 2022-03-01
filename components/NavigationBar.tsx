// import { faWallet } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { PlaidLinkOnSuccess } from 'react-plaid-link'
import { useAuth } from "../contexts/auth"
import { usePlaidAPI } from '../contexts/plaid/context'
import { usePlaidLinkToken } from '../hooks/usePlaidLinkToken'
// import { usePlaid } from '../contexts/plaid'
import { CryptoIcon } from './crypto'
import { PlaidIcon } from './plaid'


export const NavigationBar = () => {
    // const { PlaidIconLink, nextConnectionName } = usePlaid()
    const { linkToken, createLinkToken } = usePlaidLinkToken()
    const { addConnection } = usePlaidAPI()
    const { logout } = useAuth()

    useEffect(() => {
        if (linkToken === null) {
            createLinkToken()
        }
    }, [linkToken]);

    const onSuccess = React.useCallback<PlaidLinkOnSuccess>(
            (public_token, metadata) => {
                fetch(`/api/plaid/exchange_public_token/${public_token}`)
                    .then(response => {
                        return response.json()
                    })
                    .then(responseJson => {
                        const { access_token } = responseJson

                        // we now have connection info, it can be saved
                        addConnection(access_token)
                    })
            },
            []
        );

    return (
        <nav className='m-8 p-4 flex shadow-lg rounded-lg bg-white'>
            <a className='flex-1 text-stone-900 font-["Poppins"] text-4xl italic font-extrabold'>finimalist</a>
            <CryptoIcon disabled />
            <div className='w-8' />
            <PlaidIcon token={linkToken ?? ''} onSuccess={onSuccess}/>
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