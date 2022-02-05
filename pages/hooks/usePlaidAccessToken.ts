import { Dispatch, SetStateAction, useEffect, useState } from "react"

type ReturnValue = {
    accessToken: string | null;
    updatePublicToken: Dispatch<SetStateAction<string | null>>
}

/**
 * Hook to manage a PlaidAccessToken. One access token will be 
 * associated with one account 
 */
export function usePlaidAccessToken(public_token: string | null): ReturnValue {
    const [publicToken, setPublicToken] = useState<string | null>(public_token)
    const [accessToken, setAccessToken] = useState<string | null>(null)

    // helper function to perform the token exchange 
    async function exchangePublicToken() {
        let response = await fetch(`/api/plaid/exchange_public_token/${publicToken}`)
        const { access_token } = await response.json()
        setAccessToken(access_token)
    }

    // add a listener for when the publicToken is updated,
    // this will allow us to update the associated exchangeToken 
    // with it. 
    useEffect(() => {
        // ignore null tokens, will only produce error
        if (publicToken === null) return
        exchangePublicToken()
    }, [publicToken])


    return { accessToken, updatePublicToken: setPublicToken }
}