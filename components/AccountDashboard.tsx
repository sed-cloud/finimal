import { usePlaidAPI } from "../hooks/usePlaidAPI";
import { camelToTitle } from "../lib/textLib";
import { Field } from "./Field";


const AccountDashboard = () => {
    const { accountsInsights } = usePlaidAPI()
    const gridRows = Object.keys(accountsInsights).length / 6

    return (
        <div className="p-6 shadow-lg rounded-lg bg-white">
            <h1 className='text-stone-900 font-["Poppins"] text-3xl font-extrabold italic flex-1'>accounts</h1>
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
            {(!accountsInsights.totalAccounts || accountsInsights.totalAccounts === 0) &&
                <h1>No Accounts Loaded</h1>
            }
        </div>
    );
}


export default AccountDashboard;