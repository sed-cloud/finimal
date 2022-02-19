import React from "react";
import { CustomPage } from '../lib/custom-page';
import { Field } from "../components/Field";
import { NavigationBar } from "../components/NavigationBar";
import { usePlaid } from "../contexts/plaid";
import { useStatsEngine } from "../hooks/useStatsEngine";


const Home: CustomPage = () => {
    const { accounts, transactions } = usePlaid()
    const {
        totalBalance,
        totalAccounts,
        liquidBalance,
        debtBalance,
        investmentBalance,
        totalAssets,
        nonLiquidAssets,
        creditCardDebt,
        totalLoans,
        totalLoanCount,
        creditCardCount,
        totalInvestmentCount,
        totalBankCount
    } = useStatsEngine(accounts)

    return (
        <div className='m-4'>
            <NavigationBar />

            <div className="m-8">
                <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h1 className='text-stone-900 font-["Poppins"] text-3xl font-extrabold italic flex-1'>dashboard</h1>
                    <div className="h-4"></div>

                    <div className="grid grid-rows-3 grid-cols-6">
                        <Field
                            text={'Net Worth'}
                            value={accounts.length === 0 ? '-' : totalBalance.toLocaleString('en-US')}
                            valueColor={`${totalBalance > 0 ? 'text-success-content' : totalBalance === 0 ? 'text-neutral' : 'text-error-content'}`}
                        />
                        <Field
                            text={'Total Accounts'}
                            value={accounts.length === 0 ? '-' : totalAccounts.toString()}
                            valueColor={`text-neutral`}
                        />

                        <Field
                            text={'Investment Accounts'}
                            value={accounts.length === 0 ? '-' : totalInvestmentCount.toString()}
                            valueColor={`text-neutral`}

                        />

                        <Field
                            text={'Bank Accounts'}
                            value={accounts.length === 0 ? '-' : totalBankCount.toString()}
                            valueColor={`text-neutral`}

                        />

                        <Field
                            text={'Credit Cards'}
                            value={accounts.length === 0 ? '-' : creditCardCount.toString()}
                            valueColor={`text-neutral`}

                        />
                        <Field
                            text={'Loans'}
                            value={accounts.length === 0 ? '-' : totalLoanCount.toString()}
                            valueColor={`text-neutral`}

                        />

                        <Field
                            text={'Total Assets'}
                            value={accounts.length === 0 ? '-' : totalAssets.toLocaleString('en-US')}
                            valueColor={`text-success-content`}
                        />

                        <Field
                            text={'Liquid Assets'}
                            value={accounts.length === 0 ? '-' : liquidBalance.toLocaleString('en-US')}
                            valueColor={`text-success-content`}

                        />

                        <Field
                            text={'Investments'}
                            value={accounts.length === 0 ? '-' : investmentBalance.toLocaleString('en-US')}
                            valueColor={`text-success-content`}

                        />

                        <Field
                            text={'Non Liquid Assets'}
                            value={accounts.length === 0 ? '-' : nonLiquidAssets.toLocaleString('en-US')}
                            valueColor={`text-success-content`}

                        />

                        <div></div>
                        <div></div>

                        <Field
                            text={'Total Debt'}
                            value={accounts.length === 0 ? '-' : debtBalance.toLocaleString('en-US')}
                            valueColor={`text-error-content`}
                        />

                        <Field
                            text={'Cedit Card Debt'}
                            value={accounts.length === 0 ? '-' : creditCardDebt.toLocaleString('en-US')}
                            valueColor={`text-error-content`}
                        />

                        <Field
                            text={'Loan Debt'}
                            value={accounts.length === 0 ? '-' : totalLoans.toLocaleString('en-US')}
                            valueColor={`text-error-content`}
                        />

                    </div>


                </div>

                <div className="h-8" />

                <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold italic flex-1'>transactions</h1>
                    <div className="h-4"></div>

                    <div className="grid grid-rows-1 grid-cols-6">
                        <Field
                            text={'Total Transactions'}
                            value={transactions.length.toLocaleString('en-US')}
                            valueColor={`text-primary`}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

Home.requiresAuth = true
Home.redirectUnauthenticatedTo = '/'

export default Home