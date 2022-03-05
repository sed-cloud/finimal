import useSWR from "swr"


async function loadTransactions(accessTokens: string[]) {

}

export const usePlaidTransactions = (accessTokens: string[]) => {
    const { data } = useSWR([accessTokens], loadTransactions)
}