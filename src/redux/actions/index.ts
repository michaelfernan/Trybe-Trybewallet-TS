import { Currency, Expense } from '../../Type';

const ADD_CURRENCIES = 'ADD_CURRENCIES';
const ADD_EXPENSE = 'ADD_EXPENSE';
interface AddCurrenciesAction {
  type: typeof ADD_CURRENCIES;
  payload: Currency[];
}

interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  payload: Expense;
}
export const setUserEmail = (email: string) => ({
  type: 'SET_USER_EMAIL',
  payload: email,
});

export const addCurrencies = (currencies: Currency[]): AddCurrenciesAction => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

export const addExpense = (expense: Expense): AddExpenseAction => ({
  type: ADD_EXPENSE,
  payload: expense,
});
