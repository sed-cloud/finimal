import type { NextPage } from 'next'
import React from "react";
import { usePlaid } from './hooks/usePlaid';

const Home: NextPage = () => {
  const { accounts, PlaidLink } = usePlaid()

  return (
    <div>
      {PlaidLink}
      <h1>
        {accounts[0] ? `Balance: ${accounts[0].balances.current}` : 'No Account has been loaded'}
      </h1>
    </div>
  );
}

export default Home
