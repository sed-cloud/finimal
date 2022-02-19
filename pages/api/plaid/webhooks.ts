// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { usePlaid } from '../../../contexts/plaid'

type Data = {
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { loadTransactions, getConnectionNameFromItemId } = usePlaid()

    console.log(req)

    if (req.body.webhook_type === 'TRANSACTIONS' && req.body.webhook_code === 'HISTORICAL_UPDATE') {
        const connectionName = getConnectionNameFromItemId(req.body.item_id)
        if (connectionName) loadTransactions(connectionName)
    }

    res.status(200).json({})
}
