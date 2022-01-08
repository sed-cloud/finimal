import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';

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






