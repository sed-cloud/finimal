type LoadAccountCardProps = {
    PlaidConnectionLink: (connectionName: string) => JSX.Element;
    nextConnectionName: () => string;
}
export const LoadAccountCard = ({ PlaidConnectionLink, nextConnectionName }: LoadAccountCardProps) => {

    return (
        <div className="m-4 max-w-md">
            <div className="p-6 shadow-lg rounded-lg bg-white">
                <h1 className='text-stone-900 font-["Poppins"] text-2xl font-extrabold flex-1'>Load Account</h1>
                <div className="h-4"></div>
                <p className='text-stone-400 font-["Poppins"] text-sm'>
                    You are allow to connect as many bank and credit card accounts as you like
                </p>
                <div className="h-8"></div>
                <div className="flex flex-row-reverse">
                    {PlaidConnectionLink(nextConnectionName())}
                </div>
            </div>
        </div>
    )
}
