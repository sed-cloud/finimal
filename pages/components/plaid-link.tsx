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
        <button onClick={() => { console.log('test'); open() }} disabled={!ready}>
            Connect a bank account
        </button>
    );
};