import useSWR from "swr"
import { useAccountInsights } from "./useInsights";

async function loadAccounts(url: string, accessTokens: string[]) {
    return fetch(`${url}`,
        {
            method: 'POST',
            body: JSON.stringify({ accessTokens: accessTokens })
        }
    ).then(response => response.json())
}

export const usePlaidAccounts = (accessTokens: string[]) => {
    const { data } = useSWR([`/api/plaid/accounts/`, accessTokens], loadAccounts)
    const { insights } = useAccountInsights(data)

    return { accounts: data, insights }
}