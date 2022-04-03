import { AccountBase } from "plaid";
import useSWR from "swr"
import { useAccountInsights } from "./useInsights";

async function loadAccounts(url: string, accessTokens: string[]): Promise<AccountBase[]> {
    return fetch(`${url}`,
        {
            method: 'POST',
            body: JSON.stringify({ accessTokens: accessTokens })
        }
    ).then(response => response.json())
}

function accountIdToName(accountId: string, accounts: AccountBase[]) {
    return accounts.filter(a => a.account_id === accountId)[0].name
}

function accountIdToType(accountId: string, accounts: AccountBase[]) {
    return accounts.filter(a => a.account_id === accountId)[0].type
}

export const usePlaidAccounts = (accessTokens: string[]) => {
    const { data } = useSWR([`/api/plaid/accounts/`, accessTokens], loadAccounts)
    const { insights } = useAccountInsights(data)
    const AccountUtility = {
        accountIdToName: (accountId: string) => accountIdToName(accountId, data ?? []),
        accountIdToType: (accountId: string) => accountIdToType(accountId, data ?? [])
    }
    return { accounts: data, insights, AccountUtility }
}