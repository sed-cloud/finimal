import { Transaction } from "plaid"
import { useEffect, useState } from "react"


export const usePaymentTypes = (data?: Transaction[]) => {
    const [paymentTypes, setPaymentTypes] = useState<string[]>([])

    useEffect(() => {
        if (!data) {
            setPaymentTypes([]);
            return
        }

        for (const transaction of data) {
            if (!(transaction.payment_channel)) continue
            setPaymentTypes(old => [...old.filter(x => x !== transaction.payment_channel), transaction.payment_channel as string])
        }

    }, [data])

    return { paymentTypes }
}