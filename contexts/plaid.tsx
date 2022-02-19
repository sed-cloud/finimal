import Cookies from 'js-cookie';
import { AccountBase, TransactionBase } from 'plaid';
import React, { useContext, useEffect, useState } from 'react'
import { PlaidLinkOnSuccess } from 'react-plaid-link';
import { CustomAppProps, CustomPage } from '../lib/custom-page';
import { usePlaidLinkToken } from '../hooks/usePlaidLinkToken';
import { PlaidIcon } from '../components/plaid';
import { isTransactionsReady, WEBHOOK_STATE_GLOBAL_DATA_OBJECT } from '../lib/plaidWebhookManager';


type PlaidConnectionStore = { [connectionName: string]: PlaidConnection }
type PlaidConnection = {
    access_token: string
    item_id: string
    accounts?: AccountBase[]
    transactions?: TransactionBase[],
}

function usePlaidConnectionStore() {
    const [connectionId, setConnectionId] = useState(0)
    const [store, setStore] = useState<PlaidConnectionStore>({})

    const loadAccounts = (connectionName: string) => {
        // accounts already loaded
        if (store[connectionName].accounts) return

        fetch(`/api/plaid/accounts/${store[connectionName].access_token}`)
            .then(response => {
                return response.json()
            }).then(responseJson => {
                const { accounts, item } = responseJson
                setStore(old => ({ ...old, [connectionName]: { ...old[connectionName], accounts: accounts, item_id: item.item_id } } as PlaidConnectionStore))
            })
    }

    const loadTransactions = (connectionName: string) => {
        if (store[connectionName].accounts) return

        fetch(`/api/plaid/transactions`, { method: 'POST', body: JSON.stringify({ accessToken: store[connectionName].access_token }) })
            .then(response => {
                return response.json()
            }).then(responseJson => {
                const { transactions } = responseJson
                setStore(old => ({ ...old, [connectionName]: { ...old[connectionName], transactions: transactions } } as PlaidConnectionStore))
            })
    }

    const getConnectionNameFromItemId = (itemId: string): string | undefined => {
        for (const key of Object.keys(store)) {
            if (store[key].item_id === itemId) {
                return key
            }
        }
        return undefined
    }

    useEffect(() => {
        for (const key of Object.keys(store)) {
            if (store[key].accounts) continue
            loadAccounts(key)
        }
    }, [store])

    useEffect(() => {
        for (const key of Object.keys(store)) {
            if (store[key].transactions) continue
            if (isTransactionsReady(store[key].item_id)) {
                loadTransactions(key)
            }
        }
    }, [store, WEBHOOK_STATE_GLOBAL_DATA_OBJECT])


    const insert = (connectionName: string, connectionData: string, itemId: string) => {
        setStore(old => ({ ...old, [connectionName]: { access_token: connectionData, item_id: itemId } }))
        setConnectionId(connectionId + 1)
        Cookies.set(connectionName, JSON.stringify({ accessToken: connectionData, itemId: itemId }))
    }

    const remove = (connectionName: string) => {
        const { [connectionName]: data, ...newStore } = store
        setStore(newStore)
        Cookies.remove(connectionName)
    }

    const loadFromCookies = () => {
        let maxId = 0
        for (const key in Cookies.get()) {
            const { accessToken, itemId } = JSON.parse(Cookies.get(key) as string)

            // No data, ignore
            if (!accessToken) continue

            // handle connection ID collisions
            const id = parseInt(accessToken?.substring(0, 'plaidConnection'.length) as string)
            if (id > maxId) maxId = id
            insert(key, accessToken, itemId)
        }

        setConnectionId(maxId)
    }

    return { store, insert, remove, loadFromCookies, connectionId, loadTransactions, getConnectionNameFromItemId }
}

type PlaidContextState = {
    store: PlaidConnectionStore;
    PlaidIconLink: ({ connectionName }: { connectionName: string }) => JSX.Element;
    nextConnectionName: () => string;
    accounts: AccountBase[],
    transactions: TransactionBase[],


}
const PlaidContext = React.createContext<PlaidContextState>({
    store: {},
    PlaidIconLink: ({ }: { connectionName: string }) => <></>,
    nextConnectionName: () => '',
    accounts: [],
    transactions: [],
});


type PlaidProviderProps = {
    children: React.ReactElement<CustomAppProps, CustomPage>
}
export const PlaidProvider = ({ children }: PlaidProviderProps) => {
    const { store, insert, connectionId, loadTransactions, getConnectionNameFromItemId } = usePlaidConnectionStore()
    const { linkToken, createLinkToken } = usePlaidLinkToken()

    // "constructor"
    useEffect(() => {
        if (linkToken === null) {
            createLinkToken()
        }
    }, [linkToken]);

    const PlaidIconLink = ({ connectionName }: { connectionName: string }) => {
        const onSuccess = React.useCallback<PlaidLinkOnSuccess>(
            (public_token, metadata) => {
                fetch(`/api/plaid/exchange_public_token/${public_token}`)
                    .then(response => {
                        return response.json()
                    })
                    .then(responseJson => {
                        const { access_token, item_id } = responseJson

                        // we now have connection info, it can be saved
                        insert(connectionName, access_token, item_id)
                    })
            },
            []
        );

        return (
            <PlaidIcon connectionName={connectionName} token={linkToken !== null ? linkToken : ''} onSuccess={onSuccess} />
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

    const transactions = () => {
        let transactionList: TransactionBase[] = []
        for (const connectionName of Object.keys(store)) {
            const transactions = store[connectionName].transactions
            if (transactions) {
                for (const trans of transactions) {
                    transactionList.push(trans)
                }
            }
        }

        return transactionList
    }

    return (
        <PlaidContext.Provider value={{
            store,
            nextConnectionName,
            PlaidIconLink,
            accounts: accounts(),
            transactions: transactions(),
        }}>
            {children}
        </PlaidContext.Provider>
    );
};

export const usePlaid = () => useContext(PlaidContext);


