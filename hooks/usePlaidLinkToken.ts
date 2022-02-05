import { useState } from "react"

type ReturnValue = {
    linkToken: string | null;
    createLinkToken(): Promise<void>;
}

export function usePlaidLinkToken(): ReturnValue {
    const [linkToken, setLinkToken] = useState<string | null>(null)

    async function createLinkToken() {
        let response = await fetch("/api/plaid/create_link_token");
        const { link_token } = await response.json();
        setLinkToken(link_token);
    }

    return { linkToken, createLinkToken }
}