import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { Tooltip } from "../Tooltip";

interface PlaidIconProps {
    connectionName: string;
    token: string;
    onSuccess: PlaidLinkOnSuccess;
}
const PlaidIcon = ({ token, onSuccess }: PlaidIconProps) => {
    const config: PlaidLinkOptions = {
        token,
        onSuccess,
        // onExit
        // onEvent
    };

    const { open, ready, error } = usePlaidLink(config);


    return (
        <button className='
            transition-all 
            ease-in-out 
            durration-300
            has-tooltip
            
            bg-stone-200
            text-stone-900
            px-4
            rounded-xl
            hover:bg-emerald-500
            hover:text-emerald-50
            '
            onClick={() => { open() }} disabled={!ready}
        >
            <Tooltip text='Connect your bank account using Plaid' />
            <FontAwesomeIcon icon={faBuildingColumns} size={'lg'} />
        </button>
    )
}


export default PlaidIcon