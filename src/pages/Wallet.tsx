import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Type';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import ExpenseTable from '../components/Table';
import { addExpense } from '../redux/actions';

function Wallet() {
  const currencies = useSelector((state: RootState) => state.wallet.currencies);
  const dispatch = useDispatch();

  const handleAddExpense = (expense: any) => {
    dispatch(addExpense(expense));
  };

  return (
    <div>
      <Header />
      <WalletForm />
      <ExpenseTable />
    </div>
  );
}

export default Wallet;
