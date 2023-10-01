import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface Expense {
  value: number;
}

interface RootState {
  user: {
    email: string;
  };
  wallet: {
    expenses: Expense[];
  };
}

function Header() {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);

  const totalExpenseValue = useMemo(() => {
    return expenses.reduce((acc: number, expense: Expense) => acc + expense.value, 0);
  }, [expenses]);

  // Certifique-se de que totalExpenseValue seja sempre um número antes de chamar toFixed
  const totalExpense = Number.isNaN(totalExpenseValue)
    ? '0.00' : totalExpenseValue.toFixed(2);

  return (
    <header>
      <span data-testid="email-field">{userEmail}</span>
      <span data-testid="total-field">{totalExpense}</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

export default Header;
