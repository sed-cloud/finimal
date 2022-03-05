export type PlaidState = {
    accessTokens: string[]
}
export type PlaidAction = { type: 'storeToken', payload: { token: string } }
