import { Dispatch } from 'redux';

export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const USER_EMAIL = 'USER_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES' as const;
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';
export const UPDATE_TOTAL_EXPENSES = 'UPDATE_TOTAL_EXPENSES';
export const UPDATE_TOTAL_EXPENSE = 'UPDATE_TOTAL_EXPENSE';

interface AddCurrenciesAction {
  type: typeof ADD_CURRENCIES;
  payload: string[];
}

interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  payload: {
    description: string;
    value: number;
    currency: string;
    method: string;
    tag: string;
    exchangeRate: number;
  };
}

interface SaveCurrenciesAction {
  type: typeof SAVE_CURRENCIES;
  payload: string[];
}

interface LoadExpensesAction {
  type: typeof SAVE_EXPENSES;
  payload: any;
  prices: any;
}

type Action =
 AddCurrenciesAction
 | AddExpenseAction
 | SaveCurrenciesAction | LoadExpensesAction;

export const setUserEmail = (email: string) => ({
  type: SET_USER_EMAIL,
  payload: email,
});

export const addCurrencies = (currencies: string[]) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

export const addExpense = (expenseData: {
  description: string;
  value: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRate: number;
}) => ({
  type: ADD_EXPENSE,
  payload: expenseData,
});

export const saveUserEmail = (email: string) => ({
  type: USER_EMAIL,
  payload: email,
});

export const saveCurrencies = (currencies: string[]) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const loadExpenses = (expense: any, prices: any): LoadExpensesAction => ({
  type: SAVE_EXPENSES,
  payload: expense,
  prices,
});

export const deleteItem = (id: number) => ({
  type: DELETE_EXPENSES,
  payload: id,
});

export const updateTotalExpenses = () => ({
  type: UPDATE_TOTAL_EXPENSES,
});

export const saveEditedExpense = (expense: any) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: expense,
});

export const editExpense = (id: any) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const updateTotalExpense = (totalExpense:any) => ({
  type: UPDATE_TOTAL_EXPENSE,
  payload: totalExpense,
});

export const fetchAPIAndExchange = (expense?: any) => async (
  dispatch: Dispatch<Action>,
) => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    const currenciesArray = Object
      .keys(response).filter((currency) => currency !== 'USDT');

    dispatch(saveCurrencies(currenciesArray));

    if (expense) {
      dispatch(loadExpenses(expense, [response]));
    }
  } catch (error) {
    console.error('Failed to fetch data', error);
  }
};
