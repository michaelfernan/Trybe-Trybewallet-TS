import { Dispatch, AnyAction } from 'redux';

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

// Ação para definir o e-mail do usuário
export const setUserEmail = (email: string) => ({
  type: ActionTypes.SET_USER_EMAIL,
  payload: email,
});

// Ação para adicionar as moedas disponíveis no estado
export const addCurrencies = (currencies: string[]) => ({
  type: ActionTypes.ADD_CURRENCIES,
  payload: currencies,
});

// Ação para adicionar uma despesa
export const addExpense = (expenseData: {
  description: string;
  value: number;
  currency: string;
  method: string;
  tag: string;
  exchangeRate: number;
}) => ({
  type: ActionTypes.ADD_EXPENSE,
  payload: expenseData,
});

// Ação para salvar o e-mail do usuário
export const saveUserEmail = (email: string) => ({
  type: ActionTypes.USER_EMAIL,
  payload: email,
});

// Ação para salvar as moedas no estado
export const saveCurrencies = (currencies: string[]) => ({
  type: ActionTypes.SAVE_CURRENCIES,
  payload: currencies,
});

// Ação para carregar as despesas no estado
export const loadExpenses = (expense: any, prices: any) => ({
  type: ActionTypes.SAVE_EXPENSES,
  payload: expense,
  prices,
});

// Ação para deletar uma despesa
export const deleteItem = (expenses: any) => ({
  type: ActionTypes.DELETE_EXPENSES,
  payload: expenses,
});

export const updateTotalExpenses = () => ({
  type: ActionTypes.UPDATE_TOTAL_EXPENSES,
});

// Ação para salvar uma despesa editada
export const saveEditedExpense = (expense: any) => ({
  type: ActionTypes.SAVE_EDITED_EXPENSE,
  payload: expense,
});

// Ação para editar uma despesa
export const editExpense = (id: any) => ({
  type: ActionTypes.EDIT_EXPENSE,
  payload: id,
});

// Ação assíncrona para buscar as taxas de câmbio da API e atualizar as moedas
export const fetchAPIAndExchange = (expense?: any) => async (
  dispatch: Dispatch<AnyAction>,
) => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    const currenciesArray = Object.keys(response);
    const index = currenciesArray.indexOf('USDT');
    if (index > -1) {
      currenciesArray.splice(index, 1);
    }

    dispatch(saveCurrencies(currenciesArray));

    if (expense) {
      dispatch(loadExpenses(expense, [response]));
    }
  } catch (error) {
    console.error('Failed to fetch data', error);
  }
};
