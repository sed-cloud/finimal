import React from "react";
import { CustomPage } from '../lib/custom-page';
import { Field } from "../components/Field";
import { NavigationBar } from "../components/NavigationBar";
import { usePlaid } from "../contexts/plaid";
import { useStatsEngine } from "../hooks/useStatsEngine";


const Home: CustomPage = () => {
    const { accounts } = usePlaid()
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
                    <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold flex-1'>dashboard</h1>
                    <div className="h-4"></div>

                    <div className="grid grid-rows-3 grid-cols-8">

                        <Field
                            text={'Net Worth'}
                            value={accounts.length === 0 ? '-' : totalBalance.toLocaleString('en-US')}
                            valueColor={`${totalBalance > 0 ? ' text-emerald-300' : totalBalance === 0 ? 'text-stone-400' : 'text-red-300'}`}
                        />

                        <Field
                            text={'Total Accounts'}
                            value={accounts.length === 0 ? '-' : totalAccounts.toString()}
                            valueColor={`text-stone-400`}
                        />

                        <Field
                            text={'Investment Accounts'}
                            value={accounts.length === 0 ? '-' : totalInvestmentCount.toString()}
                            valueColor={`text-stone-400`}
                        />

                        <Field
                            text={'Bank Accounts'}
                            value={accounts.length === 0 ? '-' : totalBankCount.toString()}
                            valueColor={`text-stone-400`}
                        />

                        <Field
                            text={'Credit Cards'}
                            value={accounts.length === 0 ? '-' : creditCardCount.toString()}
                            valueColor={`text-stone-400`}
                        />
                        <Field
                            text={'Loans'}
                            value={accounts.length === 0 ? '-' : totalLoanCount.toString()}
                            valueColor={`text-stone-400`}
                        />

                        <div></div>
                        <div></div>

                        <Field
                            text={'Total Assets'}
                            value={accounts.length === 0 ? '-' : totalAssets.toLocaleString('en-US')}
                            valueColor={`text-emerald-300`}
                        />

                        <Field
                            text={'Liquid Assets'}
                            value={accounts.length === 0 ? '-' : liquidBalance.toLocaleString('en-US')}
                            valueColor={`text-emerald-300`}
                        />

                        <Field
                            text={'Investments'}
                            value={accounts.length === 0 ? '-' : investmentBalance.toLocaleString('en-US')}
                            valueColor={'text-emerald-300'}
                        />

                        <Field
                            text={'Non Liquid Assets'}
                            value={accounts.length === 0 ? '-' : nonLiquidAssets.toLocaleString('en-US')}
                            valueColor={'text-emerald-300'}
                        />

                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>

                        <Field
                            text={'Total Debt'}
                            value={accounts.length === 0 ? '-' : debtBalance.toLocaleString('en-US')}
                            valueColor={`text-red-300`}
                        />

                        <Field
                            text={'Cedit Card Debt'}
                            value={accounts.length === 0 ? '-' : creditCardDebt.toLocaleString('en-US')}
                            valueColor={`text-red-300`}
                        />

                        <Field
                            text={'Loan Debt'}
                            value={accounts.length === 0 ? '-' : totalLoans.toLocaleString('en-US')}
                            valueColor={`text-red-300`}
                        />

                    </div>
                </div>
            </div>

            {/* <div className='m-4 grid grid-flow-row-dense grid-cols-4'>
                <LoadAccountCard PlaidConnectionLink={PlaidConnectionLink} nextConnectionName={nextConnectionName} />
    </div> */}

        </div>
    )
}

Home.requiresAuth = true
Home.redirectUnauthenticatedTo = '/'

export default Home