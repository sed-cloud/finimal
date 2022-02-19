// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'js-cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    console.log(req)

    if (req.body.webhook_type === 'TRANSACTIONS' && req.body.webhook_code === 'HISTORICAL_UPDATE') {
        Cookies.set(req.body.item_id, 'transactions_hist_update')
    }

    res.status(200).json({})
}
