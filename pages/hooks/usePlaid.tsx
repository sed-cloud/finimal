import { AccountBase } from 'plaid'
import * as React from 'react'
import { PlaidLinkOnSuccess } from 'react-plaid-link'
import { PlaidLink } from '../components/plaid-link'
import { usePlaidAccessToken } from './usePlaidAccessToken'
import { usePlaidAccount } from './usePlaidAccount'
import { usePlaidLinkToken } from './usePlaidLinkToken'

type ActionType = 'na'
type Action = {
    type: ActionType;
}

type Dispatch = (action: Action) => void
type State = {}

type PlaidProviderProps = { children: React.ReactNode }
const PlaidStateContext = React.createContext<State | undefined>(undefined)
const PlaidDispatchContext = React.createContext<Dispatch | undefined>(
    undefined,
)

function plaidReducer(state: State, action: Action) {
    switch (action.type) {
        default:
            return state
    }
}

function PlaidProvider({ children }: PlaidProviderProps) {
    const [state, dispatch] = React.useReducer(plaidReducer, {})
    return (
        <PlaidStateContext.Provider value={state} >
            <PlaidDispatchContext.Provider value={dispatch}>
                {children}
            </PlaidDispatchContext.Provider>
        </PlaidStateContext.Provider>
    )
}

function usePlaidState() {
    const context = React.useContext(PlaidStateContext)
    if (context === undefined) {
        throw new Error('useDataState must be used within a DataProvider')
    }
    return context
}

function usePlaidDispatch() {
    const context = React.useContext(PlaidDispatchContext)
    if (context === undefined) {
        throw new Error('useDataDispatch must be used within a DataProvider')
    }
    return context
}

type ReturnValue = {
    PlaidLink: React.ReactElement<any, any> | null;
    accounts: AccountBase[]
}

function usePlaid(): ReturnValue {
    const { linkToken, createLinkToken } = usePlaidLinkToken()
    const { accessToken, updatePublicToken } = usePlaidAccessToken(null)
    const { accounts, loadAccounts } = usePlaidAccount()

    const onSuccess = React.useCallback<PlaidLinkOnSuccess>(
        (public_token, metadata) => {
            updatePublicToken(public_token)
        },
        []
    );

    React.useEffect(() => {
        if (linkToken === null) {
            createLinkToken()
        }
    }, [linkToken]);

    React.useEffect(() => {
        if (accessToken !== null) {
            loadAccounts(accessToken)
        }
    }, [accessToken])

    return {
        PlaidLink: <PlaidLink token={linkToken !== null ? linkToken : ''} onSuccess={onSuccess} />,
        accounts
    }
}

export { usePlaid }

