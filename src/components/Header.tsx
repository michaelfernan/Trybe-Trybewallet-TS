import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Type';

function Header() {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const totalExpenses = useSelector((state: RootState) => state.wallet.totalExpenses);

  return (
    <header>
      <span data-testid="email-field">{userEmail}</span>
      <span data-testid="total-field">{totalExpenses.toFixed(2)}</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

export default Header;
