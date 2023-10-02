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
  totalExpense: number,
}

const initialState: WalletState = {
  expenses: [],
  totalExpenses: 0,
  currencies: [],
  lastId: 0,
  totalExpense: 0,
};

type Action =
  | { type: ActionTypes.SAVE_CURRENCIES; payload: string[] }
  | { type: ActionTypes.ADD_EXPENSE; payload: Omit<Expense, 'id'> }
  | { type: ActionTypes.DELETE_EXPENSES; payload: number }
  | { type: ActionTypes.SAVE_EDITED_EXPENSE; payload: Expense }
  | { type: ActionTypes.UPDATE_TOTAL_EXPENSE, payload: number };

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
    exchangeRate: action.payload.value * action.payload.exchangeRate, // Correto

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
    lastId: state.lastId + 1,
  };
}

// Similar helper functions for other cases can be created

function walletReducer(state = initialState, action: Action): WalletState {
  switch (action.type) {
    case ActionTypes.SAVE_CURRENCIES:
      return handleSaveCurrencies(state, action);
    case ActionTypes.ADD_EXPENSE:
      return handleAddExpense(state, action);

    case ActionTypes.UPDATE_TOTAL_EXPENSE: {
      return {
        ...state,
        totalExpense: action.payload, // Atualize o totalExpense com o novo valor
      };
    }
    // For the rest of the cases, either implement them similarly
    // or keep them inside the main reducer if they are short.
    default:
      return state;
  }
}

export default walletReducer;
