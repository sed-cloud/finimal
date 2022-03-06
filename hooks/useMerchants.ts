import { Transaction } from "plaid"
import { useEffect, useState } from "react"


export const useMerchants = (data?: Transaction[]) => {
    const [merchants, setMerchants] = useState<string[]>([])

    useEffect(() => {
        if (!data) {
            setMerchants([]);
            return
        }

        for (const transaction of data) {
            if (!(transaction.merchant_name)) continue
            setMerchants(old => [ ...old.filter(x => x !== transaction.merchant_name), transaction.merchant_name as string])
        }

    }, [data])

    return { merchants }
}