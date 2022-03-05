import React from "react";
import { CustomPage } from '../lib/custom-page';
import { Field } from "../components/Field";
import { NavigationBar } from "../components/NavigationBar";
import { usePlaidAPI } from "../contexts/plaid/context";
import { camelToTitle } from "../lib/textLib";


const Home: CustomPage = () => {
    const { accountStats } = usePlaidAPI()
    const gridRows = Object.keys(accountStats).length / 6 

    return (
        <div className='m-4'>
            <NavigationBar />

            <div className="m-8">
                <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h1 className='text-stone-900 font-["Poppins"] text-3xl font-extrabold italic flex-1'>dashboard</h1>
                    <div className="h-4"></div>

                    {accountStats.totalAccounts > 0 && <div className={`grid grid-rows-${gridRows} grid-cols-6`}>
                        {Object.keys(accountStats).map((value, index) => {
                            return <Field
                                key={index}
                                text={camelToTitle(value)}
                                value={accountStats[value] === undefined ? '-' : accountStats[value].toLocaleString('en-US')}
                                valueColor={'text-neutral'}
                            />
                        })}
                    </div>
                    }
                    {accountStats.totalAccounts === 0 && 
                        <h1>No Accounts Loaded</h1>
                    }

                </div>

                <div className="h-8" />

                <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold italic flex-1'>transactions</h1>
                    <div className="h-4"></div>

                    {/* <div className="grid grid-rows-1 grid-cols-6">
                        <Field
                            text={'Total Transactions'}
                            value={transactions.length.toLocaleString('en-US')}
                            valueColor={`text-primary`}
                        />
                    </div> */}
                </div>

            </div>
        </div>
    )
}

Home.requiresAuth = true
Home.redirectUnauthenticatedTo = '/'

export default Home