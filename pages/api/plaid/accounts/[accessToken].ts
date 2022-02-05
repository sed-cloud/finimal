import type { NextApiRequest, NextApiResponse } from 'next'
import { AccountsGetResponse, Configuration, PlaidApi, PlaidEnvironments } from 'plaid';


if (!process.env.FINIMAL_TIER) { throw new Error('Unable to load Plaid tier') }
if (!process.env[`PLAID_CLIENT_ID_${process.env.FINIMAL_TIER}`]) { throw new Error('Unable to load Plaid client id') }
if (!process.env[`PLAID_SECRET_${process.env.FINIMAL_TIER}`]) { throw new Error('Unable to load Plaid secret') }

const configuration = new Configuration({
    basePath: PlaidEnvironments[process.env.FINIMAL_TIER.toLowerCase()],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env[`PLAID_CLIENT_ID_${process.env.FINIMAL_TIER}`],
            'PLAID-SECRET': process.env[`PLAID_SECRET_${process.env.FINIMAL_TIER}`],
        },
    },
});

const client = new PlaidApi(configuration);


type Data = AccountsGetResponse

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return new Promise((resolve, reject) => {
        client.accountsGet({
            access_token: req.query.accessToken as string,
        })
            .then(response => {
                console.log(response)
                res.status(200).json(response.data);
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