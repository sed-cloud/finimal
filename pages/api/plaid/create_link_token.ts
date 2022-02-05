import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';



if (!process.env.TIER) { throw new Error('Unable to load Plaid tier') }
if (!process.env[`PLAID_CLIENT_ID_${process.env.TIER}`]) { throw new Error('Unable to load Plaid client id') }
if (!process.env[`PLAID_SECRET_${process.env.TIER}`]) { throw new Error('Unable to load Plaid secret')}

const configuration = new Configuration({
    basePath: PlaidEnvironments[process.env.TIER.toLowerCase()],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env[`PLAID_CLIENT_ID_${process.env.TIER}`],
            'PLAID-SECRET': process.env[`PLAID_SECRET_${process.env.TIER}`],
        },
    },
});

const client = new PlaidApi(configuration);

type Data = {
    link_token: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const request = {
        user: {
            // This should correspond to a unique id for the current user.
            client_user_id: 'user-id',
        },
        client_name: 'Plaid Test App',
        products: [Products.Auth],
        language: 'en',
        // webhook: 'https://webhook.example.com',
        // redirect_uri: 'https://test.example.com/oauth.html',
        country_codes: [CountryCode.Us],
    };

    return new Promise((resolve, reject) => {


        client.linkTokenCreate(request)
            .then(response => {
                res.status(200)
                res.json(response.data);
                console.log(response.data)
                // @ts-ignore
                resolve()
            })
            .catch(error => {
                console.log(error)
                res.json(error);
                res.status(405).end()
                // @ts-ignore
                resolve()
            })
    })
}






