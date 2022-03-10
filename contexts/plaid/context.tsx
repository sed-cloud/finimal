
import * as React from 'react'


export type PlaidState = {
    accessTokens: Set<string>
}
export type PlaidAction = { type: 'storeToken', payload: { token: string } }
type Dispatch = (action: PlaidAction) => void
type PlaidProviderProps = { children: React.ReactNode }

const DEFAULT_STATE = {
    accessTokens: new Set<string>()
}

const PlaidStateContext = React.createContext<PlaidState>(DEFAULT_STATE)
const PlaidDispatchContext = React.createContext<Dispatch | undefined>(undefined)

async function PlaidReducer(state: PlaidState, action: PlaidAction) {
    switch (action.type) {
        case 'storeToken': {
            return { ...state, accessTokens: state.accessTokens.add(action.payload.token)}
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

export { PlaidProvider, usePlaid }