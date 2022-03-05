import React from "react";
import { CustomPage } from '../lib/custom-page';
import { Field } from "../components/Field";
import { NavigationBar } from "../components/NavigationBar";
import { camelToTitle } from "../lib/textLib";
import { usePlaidAPI } from "../hooks/usePlaidAPI";


const Home: CustomPage = () => {
    const { accountsInsights } = usePlaidAPI()    

    const gridRows = Object.keys(accountsInsights).length / 6

    return (
        <div className='m-4'>
            <NavigationBar />

            <div className="m-8">
                <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h1 className='text-stone-900 font-["Poppins"] text-3xl font-extrabold italic flex-1'>dashboard</h1>
                    <div className="h-4"></div>

                    {accountsInsights.totalAccounts > 0 && <div className={`grid grid-rows-${gridRows} grid-cols-6`}>
                        {Object.keys(accountsInsights).map((value, index) => {
                            return <Field
                                key={index}
                                text={camelToTitle(value)}
                                value={accountsInsights[value] === undefined ? '-' : accountsInsights[value].toLocaleString('en-US')}
                                valueColor={'text-neutral'}
                            />
                        })}
                    </div>
                    }
                    {accountsInsights.totalAccounts === 0 &&
                        <h1>No Accounts Loaded</h1>
                    }

                </div>

                <div className="h-8" />

                {/* <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold italic flex-1'>transactions</h1>
                    <div className="h-4"></div>

                    {transactionStats.totalTransactions > 0 && <div className={`grid grid-rows-1 grid-cols-6`}>
                        {Object.keys(transactionStats).map((value, index) => {
                            return <Field
                                key={index}
                                text={camelToTitle(value)}
                                value={transactionStats[value] === undefined ? '-' : transactionStats[value].toLocaleString('en-US')}
                                valueColor={'text-neutral'}
                            />
                        })}
                    </div>
                    }
                    {(!Object.keys(transactionStats).includes('totalTransactions') || transactionStats.totalTransactions === 0) &&
                        <h1>no recorded transactions</h1>
                    }
                </div> */}

            </div>
        </div>
    )
}

Home.requiresAuth = true
Home.redirectUnauthenticatedTo = '/'

export default Home