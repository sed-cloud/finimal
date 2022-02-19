// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setTransactionsReady } from '../../../lib/plaidWebhookManager'

type Data = {
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    console.log(req)

    if (req.body.webhook_type === 'TRANSACTIONS' && req.body.webhook_code === 'HISTORICAL_UPDATE') {
        setTransactionsReady(req.body.item_id)
    }

    res.status(200).json({})
}
