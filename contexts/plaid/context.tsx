
import * as React from 'react'
import { addConnection, getAllAccounts, loadAccounts, loadTransactions } from './lib'
import { PlaidAction, PlaidState } from './models'
import { StatsEngine } from './stats'



type Dispatch = (action: PlaidAction) => void
type PlaidProviderProps = { children: React.ReactNode }

const DEFAULT_STATE = { items: {}, stats: { totalAccounts: 0 } }

const PlaidStateContext = React.createContext<PlaidState>(DEFAULT_STATE)
const PlaidDispatchContext = React.createContext<Dispatch | undefined>(undefined)

async function PlaidReducer(state: PlaidState, action: PlaidAction) {
    switch (action.type) {
        case 'addConnection': {
            return await addConnection(action, state)
        }
        case 'loadAccounts': {
            return await loadAccounts(action, state)
        }
        case 'loadTransactions': {
            return await loadTransactions(action, state)
        }
        case 'invalidate': {
            return state
        }
        default:
            return state
    }
}

function useAsyncReducer(reducer: typeof PlaidReducer, initState: PlaidState): [PlaidState, (action: PlaidAction) => Promise<void>] {
    const [state, setState] = React.useState(initState)
    const dispatch = async (action: PlaidAction) => setState(await reducer(state, action));
    return [state, dispatch];
}

function PlaidProvider({ children }: PlaidProviderProps) {
    const [state, dispatch] = useAsyncReducer(
        PlaidReducer,
        DEFAULT_STATE
    )
    return (
        <PlaidStateContext.Provider value={state}>
            <PlaidDispatchContext.Provider value={dispatch}>
                {children}
            </PlaidDispatchContext.Provider>
        </PlaidStateContext.Provider>
    )
}

function usePlaidState() {
    const context = React.useContext(PlaidStateContext)
    if (context === undefined) {
        throw new Error('usePlaidState must be used within a PlaidProvider')
    }
    return context
}

function usePlaidDispatch() {
    const context = React.useContext(PlaidDispatchContext)
    if (context === undefined) {
        throw new Error('usePlaidDispatch must be used within a PlaidProvider')
    }
    return context
}

function usePlaid(): [PlaidState, Dispatch] {
    return [usePlaidState(), usePlaidDispatch()]
}

/**
 * public API for application to use 
 */
class PlaidAPI {
    /**
     * Will load transactions for an exisiting item
     * 
     * @param itemId the unique plaid item id
     */
    public static loadTransactions(accountId: string) {
        const [_state, dispatch] = usePlaid()

        dispatch({
            type: 'loadTransactions', payload: {
                accountId
            }
        })
    }


}

function usePlaidAPI() {
    const [state, dispatch] = usePlaid()

    function addConnection(accessToken: string) {
        dispatch({
            type: 'addConnection', payload: {
                accessToken
            }
        })
    }

    function loadAccounts() {
        dispatch({ type: 'loadAccounts' })
    }

    return {
        addConnection, loadAccounts, accountStats: state.stats
    }
}

export { PlaidProvider, usePlaidAPI }