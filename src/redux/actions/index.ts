import { Dispatch, AnyAction } from 'redux';
import { Expense } from '../../Type';

export enum ActionTypes {
  ADD_CURRENCIES = 'ADD_CURRENCIES',
  ADD_EXPENSE = 'ADD_EXPENSE',
  SET_USER_EMAIL = 'SET_USER_EMAIL',
  USER_EMAIL = 'USER_EMAIL',
  SAVE_CURRENCIES = 'SAVE_CURRENCIES',
  SAVE_EXPENSES = 'SAVE_EXPENSES',
  DELETE_EXPENSES = 'DELETE_EXPENSES',
  EDIT_EXPENSE = 'EDIT_EXPENSE',
  SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE',
  UPDATE_TOTAL_EXPENSES = 'UPDATE_TOTAL_EXPENSES',
}

export const setUserEmail = (email: string) => ({
  type: ActionTypes.SET_USER_EMAIL,
  payload: email,
});

export const addCurrencies = (currencies: Record<string, any>) => {
  const currencyCodes = Object.keys(currencies);
  return {
    type: ActionTypes.ADD_CURRENCIES,
    payload: currencyCodes,
  };
};

export const addExpense = (expense: Expense) => ({
  type: ActionTypes.ADD_EXPENSE,
  payload: expense,
});

export const saveUserEmail = (email: string) => ({
  type: ActionTypes.USER_EMAIL,
  payload: email,
});

export const saveCurrencies = (currencies: string[]) => ({
  type: ActionTypes.SAVE_CURRENCIES,
  payload: currencies,
});

export const loadExpenses = (expense: any, prices: any) => ({
  type: ActionTypes.SAVE_EXPENSES,
  payload: expense,
  prices,
});

export const deleteItem = (expenses: any) => ({
  type: ActionTypes.DELETE_EXPENSES,
  payload: expenses,
});

export function saveExpenses(expense: any, prices: any) {
  return {
    type: ActionTypes.SAVE_EXPENSES,
    payload: expense,
    prices,
  };
}

export const updateTotalExpenses = () => ({
  type: ActionTypes.UPDATE_TOTAL_EXPENSES,
});

export const saveEditedExpense = (expense: any) => ({
  type: ActionTypes.SAVE_EDITED_EXPENSE,
  payload: expense,
});

export const editExpense = (id: any) => ({
  type: ActionTypes.EDIT_EXPENSE,
  payload: id,
});

export const fetchExchange = (expense: any) => async (dispatch: any) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(loadExpenses(expense, data));
};

export const fetchAPI = () => async (dispatch: Dispatch<AnyAction>) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await request.json();
  const currenciesArray = Object.keys(response);
  const index = currenciesArray.indexOf('USDT');
  currenciesArray.splice(index, 1);
  dispatch(saveCurrencies(currenciesArray));
};
