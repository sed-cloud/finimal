// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

if (!process.env.FINIMAL_ENTRY_TOKEN) { throw new Error ('Unable to load entry token')}

type Data = {
    token: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const token = JSON.parse(req.body).token

    if (token === process.env.FINIMAL_ENTRY_TOKEN) {
        res.status(200).json({ token: token })
    } else {
        res.status(401)
        res.statusMessage = 'Invalid Token'
        res.end()
    }

}
