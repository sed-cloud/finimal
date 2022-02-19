// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

var state: { [key: string]: { hasTransactionData: boolean } } = {}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.body.webhook_type === 'TRANSACTIONS' && req.body.webhook_code === 'HISTORICAL_UPDATE') {
        state[req.body.item_id] = { hasTransactionData: true }
    }
    res.status(200).json({})
}
