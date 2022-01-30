import React from "react";
import { CustomPage } from '../lib/custom-page';


const Home: CustomPage = () => {


    return (
        <div className='m-4'>
            <nav className='p-4'>
                <a className='text-stone-900 font-["Poppins"] text-2xl italic font-bold'>Personal Finance Application</a>
            </nav>

            <div className='m-4 '>
                <h1 className='text-stone-900 font-["Poppins"] text-4xl font-extrabold text-center bg-red-100'>No Accounts Loaded</h1>
            </div>

        </div>
    )
}

Home.requiresAuth = true
Home.redirectUnauthenticatedTo = '/'

export default Home