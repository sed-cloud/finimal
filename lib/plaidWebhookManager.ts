

export const WEBHOOK_STATE_GLOBAL_DATA_OBJECT: { [key: string]: { transactionsReady?: boolean } } = {}

export function setTransactionsReady(itemId: string) {
    WEBHOOK_STATE_GLOBAL_DATA_OBJECT[itemId] = { transactionsReady: true }
}

export function isTransactionsReady(itemId: string) {
    return WEBHOOK_STATE_GLOBAL_DATA_OBJECT[itemId]?.transactionsReady
}