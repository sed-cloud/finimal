// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Transaction } from 'plaid';
import { PlaidClient } from '../../../lib/plaidClient';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Transaction[]>
) {
    return new Promise(async (resolve, reject) => {
        const today = new Date()
        const yearAgo = new Date(today)
        yearAgo.setFullYear(today.getFullYear() - 1)

        const accessToken = JSON.parse(req.body).accessToken

        const response = await helper(accessToken, yearAgo, today, 0)
        let transactions = response.transactions
        const total_transactions = response.total_transactions

        if (total_transactions === 0) {
            console.log(response.error)
            res.status(200).end(response.error)
            //@ts-ignore
            resolve()
            return
        }

        while (transactions.length < total_transactions) {
            const response = await helper(req.body.accessToken, yearAgo, today, transactions.length)
            if (response.transactions.length === 0) break
            transactions = transactions.concat(response.transactions)
        }
        res.status(200).json(transactions)
        // @ts-ignore
        resolve()
    })
}

async function helper(accessToken: string, startDate: Date, endDate: Date, offset: number) {
    try {
        const response = await PlaidClient.transactionsGet({
            access_token: accessToken,
            start_date: startDate.toLocaleDateString('en-CA'),
            end_date: endDate.toLocaleDateString('en-CA'),
            options: {
                offset: offset
            }
        });
        return response.data;
    } catch (error) {
        return { transactions: [] as Transaction[], total_transactions: 0, error: error };
    }
}
