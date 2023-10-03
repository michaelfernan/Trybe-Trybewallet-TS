import { ExchangeRateInfo } from '../../Type';

import {
  SAVE_CURRENCIES,
  ADD_EXPENSE,
  DELETE_EXPENSES,
  SAVE_EDITED_EXPENSE,
  UPDATE_TOTAL_EXPENSE,
} from '../actions';

interface Expense {
  id: number;
  description: string;
  value: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: ExchangeRateInfo;
}
interface WalletState {
  expenses: Expense[];
  totalExpenses: number;
  currencies: string[];
  lastId: number;
  exchangeRates: ExchangeRateInfo;
}

const initialState: WalletState = {
  expenses: [],
  totalExpenses: 0,
  currencies: [],
  lastId: -1,
  exchangeRates: {
    code: '',
    codein: '',
    name: '',
    high: '',
    low: '',
    varBid: '',
    pctChange: '',
    bid: '',
    ask: '',
    timestamp: '',
    create_date: '',
  },
};

type Action =
| { type: typeof SAVE_CURRENCIES; payload: string[] }
| { type: typeof ADD_EXPENSE; payload: Omit<Expense, 'id'> }
| { type: typeof DELETE_EXPENSES; payload: number }
| { type: typeof SAVE_EDITED_EXPENSE; payload: Expense }
| { type: typeof UPDATE_TOTAL_EXPENSE; payload: number };

function handleSaveCurrencies(state: WalletState, action: {
  type: typeof SAVE_CURRENCIES; payload: string[] }): WalletState {
  return {
    ...state,
    currencies: action.payload,
  };
}

function handleAddExpense(state: WalletState, action: {
  type: typeof ADD_EXPENSE; payload: Omit<Expense, 'id'> }): WalletState {
  const newExpense: Expense = {
    id: state.lastId + 1,
    ...action.payload,
    exchangeRates: action.payload.exchangeRates,
  };

  const value = newExpense.exchangeRates[action.payload.currency] as ExchangeRateInfo;
  const convertedValue =  parseFloat(action.payload.value) * parseFloat(value.ask);


  return {
    ...state,
    expenses: [...state.expenses, newExpense],
    totalExpenses: (state.totalExpenses + convertedValue),
    lastId: state.lastId + 1,
  };
}

function walletReducer(state = initialState, action: Action): WalletState {
  switch (action.type) {
    case SAVE_CURRENCIES:
      return handleSaveCurrencies(state, action);
    case ADD_EXPENSE:
      return handleAddExpense(state, action);
    case UPDATE_TOTAL_EXPENSE:
      return {
        ...state,
        totalExpenses: state.totalExpenses - action.payload,
      };
    case DELETE_EXPENSES: {
      const newExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
      return {
        ...state,
        expenses: newExpenses,
        totalExpenses: state.totalExpenses,
      };
    }
    default:
      return state;
  }
}

export default walletReducer;
