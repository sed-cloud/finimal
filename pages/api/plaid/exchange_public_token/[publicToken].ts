import type { NextApiRequest, NextApiResponse } from 'next'
import { AccountsGetResponse, Configuration, PlaidApi, PlaidEnvironments } from 'plaid';


const configuration = new Configuration({
    basePath: PlaidEnvironments['sandbox'],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': '619eb3ff6f5cd0001aee8399',
            'PLAID-SECRET': 'a828517f960ad28c66ed2ee24afe23',
        },
    },
});

const client = new PlaidApi(configuration);


type Data = {
    access_token: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return new Promise((resolve, reject) => {
        client.itemPublicTokenExchange({
            public_token: req.query.publicToken as string,
        })
            .then(response => {
                console.log(response)
                res.status(200).json({ access_token: response.data.access_token } );
                // @ts-ignore
                resolve()
            }).catch(error => {
                console.log(error)
                res.status(405).end(error)
                // @ts-ignore
                resolve()
            })
    })
}