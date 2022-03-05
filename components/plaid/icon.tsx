import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { usePlaidAccessTokenStore } from "../../hooks/usePlaidAccessTokenStore";

const PlaidIcon = () => {
    const { linkToken, handleTokenExchange } = usePlaidAccessTokenStore()

    const config: PlaidLinkOptions = {
        token: linkToken ?? '',
        onSuccess: handleTokenExchange,
        // onExit
        // onEvent
    };

    const { open, ready } = usePlaidLink(config);


    return (
        <button className='
            transition-all 
            ease-in-out 
            durration-300
            
            bg-stone-200
            text-stone-900
            px-4
            rounded-xl
            hover:bg-emerald-500
            hover:text-emerald-50
            tooltip
            tooltip-bottom
            font-["Poppins"]
            '
            onClick={() => { open() }} disabled={!ready}
            data-tip='Connect your bank account using Plaid'
        >
            <FontAwesomeIcon icon={faBuildingColumns} size={'lg'} />
        </button>
    )
}


export default PlaidIcon