import React from 'react';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import ExpenseTable from '../components/Table';

function Wallet() {
  return (
    <div>
      <Header />
      <WalletForm />
      <ExpenseTable />
    </div>
  );
}

export default Wallet;
