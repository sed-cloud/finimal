import useSWR from "swr";

export function usePlaidLinkToken() {
    async function createLinkToken(url: string) {
        return fetch(url).then(response => response.json()).then(responseJson => responseJson.link_token)
    }

    const { data, error } = useSWR<string, any>("/api/plaid/create_link_token", createLinkToken)

    if (error) console.log(error)

    return { linkToken: data }
}