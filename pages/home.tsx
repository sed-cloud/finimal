import React from "react";
import { CustomPage } from '../lib/custom-page';
import { NavigationBar } from "../components/NavigationBar";
import AccountDashboard from "../components/AccountDashboard";
import TransactionDashboard from "../components/TransactionDashboard";
import { TransactionExplorer } from "../components/transactions";
import { usePlaidAPI } from "../hooks/usePlaidAPI";


const Home: CustomPage = () => {
    return (
        <div className='m-4'>
            <NavigationBar />

            <div className="m-8">
                {/* <AccountDashboard /> */}
                {/* <div className="h-8" /> */}
                {/* <TransactionDashboard /> */}
                <TransactionExplorer />
            </div>
        </div>
    )
}

Home.requiresAuth = true
Home.redirectUnauthenticatedTo = '/'

export default Home