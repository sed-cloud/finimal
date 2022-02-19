import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';


if (!process.env.FINIMAL_TIER) { throw new Error('Unable to load Plaid tier') }
if (!process.env[`PLAID_CLIENT_ID`]) { throw new Error('Unable to load Plaid client id') }
if (!process.env[`PLAID_SECRET_${process.env.FINIMAL_TIER}`]) { throw new Error('Unable to load Plaid secret') }

const configuration = new Configuration({
    basePath: PlaidEnvironments[process.env.FINIMAL_TIER.toLowerCase()],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env[`PLAID_CLIENT_ID`],
            'PLAID-SECRET': process.env[`PLAID_SECRET_${process.env.FINIMAL_TIER}`],
        },
    },
});

export const PlaidClient = new PlaidApi(configuration);