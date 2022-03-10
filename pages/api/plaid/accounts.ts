import { NextApiRequest, NextApiResponse } from "next";
import { AccountBase } from "plaid";
import { PlaidClient } from "../../../lib/plaidClient";

type Data = AccountBase[]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const tokens: string[] = JSON.parse(req.body).accessTokens as string[]

    if (tokens.length === 0) {
        return new Promise((resolve, reject) => {
            res.status(200).json([])
            //@ts-ignore
            resolve()
        })
    }

    const apiCalls: Promise<AccountBase[]>[] = []
    for (const token of tokens) {
        const func = PlaidClient.accountsGet({
            access_token: token,
        })
            .then(response => response.data).then(data => {
                return data.accounts
            })

        apiCalls.push(func)
    }

    return new Promise(async (resolve, reject) => {
        const result = await Promise.all(apiCalls);
        let allAccounts: AccountBase[] = [];
        result.forEach(accounts => {
            allAccounts = allAccounts.concat(accounts);
        });
        res.status(200).json(allAccounts);
        //@ts-ignore
        resolve();
    })
}