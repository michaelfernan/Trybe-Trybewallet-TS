import { ActionTypes } from '../actions';

interface Expense {
  id: number;
  description: string;
  value: number;
  currency: string;
  method: string;
  tag: string;
  exchangeRate: number;
}

interface WalletState {
  expenses: Expense[];
  totalExpenses: number;
  currencies: string[];
  lastId: number;
}

const initialState: WalletState = {
  expenses: [],
  totalExpenses: 0,
  currencies: [],
  lastId: 0,
};

type Action =
  | { type: ActionTypes.SAVE_CURRENCIES; payload: string[] }
  | { type: ActionTypes.ADD_EXPENSE; payload: Omit<Expense, 'id'> }
  | { type: ActionTypes.UPDATE_TOTAL_EXPENSES; payload: number }
  | { type: ActionTypes.DELETE_EXPENSES; payload: number }
  | { type: ActionTypes.SAVE_EDITED_EXPENSE; payload: Expense };

function handleSaveCurrencies(state: WalletState, action: {
  type: ActionTypes.SAVE_CURRENCIES; payload: string[] }): WalletState {
  return {
    ...state,
    currencies: action.payload,
  };
}

function handleAddExpense(state: WalletState, action: {
  type: ActionTypes.ADD_EXPENSE; payload: Omit<Expense, 'id'> }): WalletState {
  console.log('oii bebeee me pede pra fazerrr');
  console.log(action.payload);

  const newExpense: Expense = {
    id: state.lastId + 1,
    ...action.payload,
    exchangeRate: action.payload.exchangeRate,
  };

  console.log({
    expenses: [...state.expenses, newExpense],
    totalExpenses: state.totalExpenses + newExpense.value * newExpense.exchangeRate,
    lastId: state.lastId + 1,
  });

  return {
    ...state,
    expenses: [...state.expenses, newExpense],
    totalExpenses: state.totalExpenses + newExpense.value * newExpense.exchangeRate,
    lastId: state.lastId + 1, // Corrigido aqui
  };
}

// Similar helper functions for other cases can be created

function walletReducer(state = initialState, action: Action): WalletState {
  switch (action.type) {
    case ActionTypes.SAVE_CURRENCIES:
      return handleSaveCurrencies(state, action);
    case ActionTypes.ADD_EXPENSE:
      return handleAddExpense(state, action);
    // For the rest of the cases, either implement them similarly
    // or keep them inside the main reducer if they are short.
    default:
      return state;
  }
}

export default walletReducer;
