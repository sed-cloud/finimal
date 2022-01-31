import { FunctionComponent } from "react";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

interface Props {
    token: string;
    onSuccess: PlaidLinkOnSuccess;
}

export const PlaidLink: FunctionComponent<Props> = ({ token, onSuccess }) => {

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
        // onExit
        // onEvent
    };

    const { open, ready, error } = usePlaidLink(config);

    return (
        <button
            className='
            transition-all
            ease-in-out
            durration-300

            bg-stone-200
            text-stone-900
            px-4
            py-2
            font-["Poppins"]
            font-bold
            rounded-xl

            hover:bg-violet-600
            hover:text-red-50
            '
            onClick={() => { open() }} disabled={!ready}>
            Add Account
        </button>
    );
};