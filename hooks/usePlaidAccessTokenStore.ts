import React from "react";
import { PlaidLinkOnSuccess } from "react-plaid-link";
import { usePlaid } from "../contexts/plaid/context";
import { usePlaidLinkToken } from "./usePlaidLinkToken";


export const usePlaidAccessTokenStore = () => {
    const { linkToken } = usePlaidLinkToken()
    const [state, dispatch] = usePlaid()

    const handleTokenExchange = React.useCallback<PlaidLinkOnSuccess>((public_token, metadata) => {
        fetch(`/api/plaid/exchange_public_token/${public_token}`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                dispatch({ type: 'storeToken', payload: { token: responseJson.access_token } })
            })
    }, []);



    return { linkToken, handleTokenExchange, accessTokens: Array.from(state.accessTokens) }
}