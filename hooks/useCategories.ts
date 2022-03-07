import { Transaction } from "plaid";
import { useEffect, useState } from "react";



export const useCategories = (data?: Transaction[]) => {
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        if (!data) {
            setCategories([]);
            return
        }

        for (const transaction of data) {
            if (!transaction.category) continue
            setCategories(old => [...old.filter(x => !transaction.category?.includes(x)), ... (transaction.category ?? [])])
        }

    }, [data])

    return { categories } 
}