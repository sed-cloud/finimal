import type { NextPage } from 'next'
import { AccountBase } from 'plaid';
import React, { useCallback, useState, FunctionComponent, useEffect } from "react";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from "react-plaid-link";

interface Props {
  token: string;
  onSuccess: PlaidLinkOnSuccess;
}

const PlaidLink: FunctionComponent<Props> = ({ token, onSuccess }) => {

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

const Home: NextPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState('NOTSET');
  const [account, setAccount] = useState<AccountBase|null>(null);

  // generate a link_token
  React.useEffect(() => {
    async function createLinkToken() {
      let response = await fetch("/api/create_link_token");
      const { link_token } = await response.json();
      setToken(link_token);
    }
    createLinkToken();
  }, []);

  async function getAccount() {
    let response = await fetch(`/api/accounts/${accessToken}`);
    const { accounts } = await response.json()
    console.log(response)
    console.log(accounts)
    setAccount(accounts[0])
  }

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (public_token, metadata) => {
      console.log(public_token)
      // send public_token to server
      async function getPublicToken() {
        let response = await fetch(`/api/exchange_public_token/${public_token}`)
        const { access_token } = await response.json()
        console.log(access_token)
        setAccessToken(access_token)
      }

      getPublicToken()
    },
    []
  );

  useEffect(() => {
    if (accessToken !== null) {
      getAccount()
    }
  }, [accessToken])

  // only initialize Link once our token exists
  return token === null ? (
    // insert your loading animation here
    <div>loading</div>
  ) : (
    <div>
      <PlaidLink token={token} onSuccess={onSuccess} />
      <h1>
        {account ? `Balance: ${account.balances.current}` : 'No Account has been loaded'}
      </h1>
    </div>
  );
}

export default Home
