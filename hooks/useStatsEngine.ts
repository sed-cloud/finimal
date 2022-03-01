// import { AccountBase } from "plaid";
// import { useEffect, useState } from "react";


// type Stats = {
//     totalBalance: number;
//     liquidBalance: number;
//     totalAccounts: number;
//     debtBalance: number;
//     investmentBalance: number;
//     totalAssets: number;
//     nonLiquidAssets: number;
//     creditCardDebt: number;
//     totalLoans: number;
//     totalLoanCount: number;
//     creditCardCount: number;
//     totalInvestmentCount: number;
//     totalBankCount: number;
// }

// export const useStatsEngine = (accounts: AccountBase[]): Stats => {
//     const [totalBalance, setTotalBalance] = useState(0)
//     const [liquidBalance, setLiquidBalance] = useState(0)
//     const [debtBalance, setDebtBalance] = useState(0)
//     const [totalAccounts, setTotalAccounts] = useState(0)
//     const [investmentBalance, setInvestmentBalance] = useState(0)
//     const [totalAssets, setTotalAssets] = useState(0)
//     const [nonLiquidAssets, setNonLiquidAssets] = useState(0)
//     const [creditCardDebt, setCreditCardDebt] = useState(0)
//     const [totalLoans, setTotalLoans] = useState(0)
//     const [totalLoanCount, setTotalLoanCount] = useState(0)
//     const [creditCardCount, setCreditCardCount] = useState(0)
//     const [totalInvestmentCount, setTotalInvestmentCount] = useState(0)
//     const [totalBankCount, setTotalBankCount] = useState(0)

//     const load = () => {
//         if (accounts.length <= 0) {
//             return
//         }

//         let total = 0
//         let liquid = 0
//         let debt = 0
//         let investment = 0
//         let assets = 0
//         let nonLiquid = 0
//         let creditDebt = 0
//         let loans = 0
//         let loanCount = 0
//         let creditCount = 0
//         let investmentCount = 0
//         let bankCount = 0

//         accounts.forEach((value) => {
//             if (value.balances.current) {
//                 if (value.type === 'loan' || value.type === 'credit') {
//                     total -= value.balances.current
//                     debt += value.balances.current

//                     if (value.type === 'credit') {
//                         creditDebt += value.balances.current
//                         creditCount += 1
//                     }

//                     if (value.type === 'loan') {
//                         loans += value.balances.current
//                         loanCount += 1
//                     }
//                 }
//                 else {
//                     assets += value.balances.current
//                     total += value.balances.current
//                     if (value.balances.available) {
//                         liquid += value.balances.available // only avaliable assets are considered liquid
//                         nonLiquid += value.balances.current - value.balances.available
//                     }
//                     else {
//                         investment += value.balances.current
//                     }
                    
//                     if (value.type === 'depository') {
//                         bankCount += 1
                        
//                     }
//                     if (value.type == 'investment' || value.type === 'brokerage') {
//                         investmentCount += 1
//                     }
//                 }
//             }
//         })

//         setTotalBalance(total)
//         setLiquidBalance(liquid)
//         setDebtBalance(debt)
//         setInvestmentBalance(investment)
//         setTotalAccounts(accounts.length)
//         setTotalAssets(assets)
//         setNonLiquidAssets(nonLiquid)
//         setCreditCardDebt(creditDebt)
//         setTotalLoans(loans)
//         setTotalLoanCount(loanCount)
//         setCreditCardCount(creditCount)
//         setTotalInvestmentCount(investmentCount)
//         setTotalBankCount(bankCount)
//     }

//     useEffect(() => {
//         load()
//     }, [accounts])

//     return {
//         totalBalance,
//         liquidBalance,
//         totalAccounts,
//         debtBalance,
//         investmentBalance,
//         totalAssets,
//         nonLiquidAssets,
//         creditCardDebt,
//         totalLoans,
//         totalLoanCount,
//         creditCardCount,
//         totalInvestmentCount,
//         totalBankCount
//     }
// }