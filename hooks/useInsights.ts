import { AccountBase } from "plaid";
import { StatsEngine } from "../lib/stats";


export const useAccountInsights = (accounts?: AccountBase[]) => {
    if (!accounts) return { insights: {}}
    const insights = StatsEngine.computeAccountStats(accounts)
    return { insights }
}