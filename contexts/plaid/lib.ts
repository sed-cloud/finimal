import { AccountBase, TransactionBase } from "plaid";
import { AddConnectionAction, LoadAccountAction, LoadTransactionsAction, PlaidState } from "./models";
import { StatsEngine } from "./stats";

export async function addConnection(action: AddConnectionAction, oldState: PlaidState) {
    let newState = await __processNewAccounts(action.payload.accessToken, oldState)
    StatsEngine.computeAccountStats(getAllAccounts(newState))
    newState.stats = StatsEngine.getAccountStats()
    return newState
}

export async function loadAccounts(_action: LoadAccountAction, oldState: PlaidState) {
    let newState = oldState
    for (const accountId of Object.keys(oldState.items)) {
        newState = await __processNewAccounts(oldState.items[accountId].accessToken, newState)
    }
    StatsEngine.computeAccountStats(getAllAccounts(newState))
    newState.stats = StatsEngine.getAccountStats()
    return newState
}

export async function loadTransactions(action: LoadTransactionsAction, oldState: PlaidState) {
    const accessToken = oldState.items[action.payload.accountId].accessToken
    return __loadTransactions(accessToken).then(
        ({ transactions }) => {
            let newState = oldState
            for (const transaction of transactions) {
                const transactionAccountId = transaction.account_id
                const filtered = newState.items[transactionAccountId].transactions.filter(value => {
                    return value.transaction_id === transaction.transaction_id
                })

                if (filtered.length === 0) {
                    // transaction we are processing is not stored yet
                    newState.items[transactionAccountId].transactions.push(transaction)
                }
            }
            return newState
        }
    )

}

export function getAllAccounts(state: PlaidState) {
    const accountList: AccountBase[] = []
    console.log(Object.keys(state.items))
    for (const accountId of Object.keys(state.items)) {
        const account = state.items[accountId].account
        accountList.push(account)
    }
    return accountList
}

async function __loadTransactions(accessToken: string): Promise<{ transactions: TransactionBase[]; itemId: string | undefined; }> {
    try {
        const response = await fetch(`/api/plaid/transactions`, { method: 'POST', body: JSON.stringify({ accessToken }) })
        const responseJson = await response.json();
        const { transactions, item } = responseJson
        return { transactions: transactions, itemId: item.item_id }
    } catch (error) {
        return { transactions: [], itemId: undefined };
    }
}

async function __processNewAccounts(accessToken: string, oldState: PlaidState) {
    return __loadAccounts(accessToken).then(
        ({ accounts, itemId }) => {
            let newState = oldState;
            for (const account of accounts) {
                if (isAccountLoaded(account.account_id, itemId as string, oldState)) continue
                newState = {
                    ...newState,
                    items: {
                        ...newState.items,
                        [account.account_id]: {
                            accessToken: accessToken,
                            account,
                            itemId: itemId as string,
                            transactions: []
                        }
                    }
                }
            }
            return newState
        }
    )
}

async function __loadAccounts(accessToken: string): Promise<{ accounts: AccountBase[]; itemId: string | undefined; }> {
    try {
        const response = await fetch(`/api/plaid/accounts/${accessToken}`);
        const responseJson = await response.json();
        const { accounts, item } = responseJson;
        return { accounts: accounts, itemId: item.item_id };
    } catch (error) {
        return { accounts: [], itemId: undefined };
    }
}

/**
 * checks if account is already loaded
 * 
 * @param accountId the account to search for
 * @param state the current stored data
 * @returns true if account is found, false otherwise
 */
function isAccountLoaded(accountId: string, itemId: string, state: PlaidState): boolean {
    for (const _accountId of Object.keys(state.items)) {
        if (_accountId === accountId || itemId === state.items[_accountId].itemId) {
            return true
        }
    }
    return false
}