import Cookies from 'js-cookie';
import { AccountBase } from 'plaid';
import React, { useContext, useEffect, useState } from 'react'
import { PlaidLinkOnSuccess } from 'react-plaid-link';
import { CustomAppProps, CustomPage } from '../lib/custom-page';
import { PlaidLink } from '../pages/components/plaid-link';
import { usePlaidLinkToken } from '../pages/hooks/usePlaidLinkToken';


type PlaidConnectionStore = { [connectionName: string]: PlaidConnection }
type PlaidConnection = {
    access_token: string
    accounts?: AccountBase[]
}

function usePlaidConnectionStore() {
    const [connectionId, setConnectionId] = useState(0)
    const [store, setStore] = useState<PlaidConnectionStore>({})

    const loadAccounts = (connectionName: string, access_token: string) => {
        // accounts already loaded
        if (store[connectionName].accounts) return

        console.log('loading accounts for', connectionName, access_token)


        fetch(`/api/plaid/accounts/${access_token}`)
            .then(response => {
                return response.json()
            }).then(responseJson => {
                const { accounts } = responseJson
                const newStore = { ...store, [connectionName]: {access_token: store[connectionName], accounts: accounts}}
                setStore(newStore as PlaidConnectionStore)
            })
    }

    useEffect(() => {
        for (const key of Object.keys(store)) {
            loadAccounts(key, store[key].access_token)
        }
    }, [store])


    const insert = (connectionName: string, connectionData: string) => {
        setStore({ ...store, [connectionName]: { access_token: connectionData } })
        setConnectionId(connectionId + 1)
        Cookies.set(connectionName, connectionData)
    }

    const remove = (connectionName: string) => {
        const { [connectionName]: data, ...newStore } = store
        setStore(newStore)
        Cookies.remove(connectionName)
    }

    const loadFromCookies = () => {
        let maxId = 0
        for (const key in Cookies.get()) {
            const data = Cookies.get(key)

            // No data, ignore
            if (!data) continue

            // handle connection ID collisions
            const id = parseInt(data?.substring(0, 'plaidConnection'.length) as string)
            if (id > maxId) maxId = id
            insert(key, data)
        }

        setConnectionId(maxId)
    }

    return { store, insert, remove, loadFromCookies, connectionId }
}

type PlaidContextState = {
    store: PlaidConnectionStore;
    PlaidConnectionLink: (connectionName: string) => JSX.Element;
    nextConnectionName: () => string;
    accounts: AccountBase[]

}
const PlaidContext = React.createContext<PlaidContextState>({
    store: {},
    PlaidConnectionLink: (_connectionName: string) => <></>,
    nextConnectionName: () => '',
    accounts: []
});


type PlaidProviderProps = {
    children: React.ReactElement<CustomAppProps, CustomPage>
}
export const PlaidProvider = ({ children }: PlaidProviderProps) => {
    const { store, insert, connectionId } = usePlaidConnectionStore()
    const { linkToken, createLinkToken } = usePlaidLinkToken()

    // "constructor"
    useEffect(() => {
        if (linkToken === null) {
            createLinkToken()
        }
    }, [linkToken]);

    const PlaidConnectionLink = (connectionName: string) => {
        const onSuccess = React.useCallback<PlaidLinkOnSuccess>(
            (public_token, metadata) => {
                fetch(`/api/plaid/exchange_public_token/${public_token}`)
                    .then(response => {
                        return response.json()
                    })
                    .then(responseJson => {
                        const { access_token } = responseJson

                        // we now have connection info, it can be saved
                        insert(connectionName, access_token)
                    })
            },
            []
        );

        return (
            <PlaidLink connectionName={connectionName} token={linkToken !== null ? linkToken : ''} onSuccess={onSuccess} />
        )
    }

    const nextConnectionName = () => {
        return `plaidConnection${connectionId.toString()}`
    }

    const accounts = () => {
        let accountList: AccountBase[] = []
        for (const connectionName of Object.keys(store)) {
            const accounts = store[connectionName].accounts
            if (accounts) {
                for (const acc of accounts) {
                    accountList.push(acc)
                }
            }
        }

        return accountList
    }

    return (
        <PlaidContext.Provider value={{
            store,
            nextConnectionName,
            PlaidConnectionLink,
            accounts: accounts()
        }}>
            {children}
        </PlaidContext.Provider>
    );
};

export const usePlaid = () => useContext(PlaidContext);


