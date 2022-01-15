import { AccountBase } from "plaid"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type ReturnValue = {
    accounts: AccountBase[];
    loadAccounts: Dispatch<SetStateAction<string | null>>
}

export function usePlaidAccount(): ReturnValue {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [accounts, setAccounts] = useState<AccountBase[]>([])


    async function getAccounts() {
        let response = await fetch(`/api/accounts/${accessToken}`);
        const { accounts } = await response.json()
        setAccounts(accounts)
    }

    useEffect(() => {
        if (accessToken !== null) {
            getAccounts()
        }
    }, [accessToken])

    return { accounts, loadAccounts: setAccessToken }
}