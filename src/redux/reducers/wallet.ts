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
}

const initialState: WalletState = {
  expenses: [],
  totalExpenses: 0,
  currencies: [],
};

const walletReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SAVE_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      };
    case ActionTypes.ADD_EXPENSE: {
      const newExpense: Expense = {
        id: state.expenses.length,
        ...action.payload,
      };
      return {
        ...state,
        expenses: [...state.expenses, newExpense],
        totalExpenses:
          state.totalExpenses + newExpense.value * action.payload.exchangeRate,
      };
    }
    case ActionTypes.UPDATE_TOTAL_EXPENSES:
      return {
        ...state,
        totalExpenses: action.payload,
      };
    case ActionTypes.DELETE_EXPENSES: {
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
      const updatedTotalExpenses = updatedExpenses.reduce(
        (total, expense) => total + expense.value * expense.exchangeRate,
        0,
      );
      return {
        ...state,
        expenses: updatedExpenses,
        totalExpenses: updatedTotalExpenses,
      };
    }
    case ActionTypes.SAVE_EDITED_EXPENSE: {
      const editedExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      if (editedExpenseIndex !== -1) {
        const editedExpenses = [...state.expenses];
        editedExpenses[editedExpenseIndex] = action.payload;
        const editedTotalExpenses = editedExpenses.reduce(
          (total, expense) => total + expense.value * expense.exchangeRate,
          0,
        );
        return {
          ...state,
          expenses: editedExpenses,
          totalExpenses: editedTotalExpenses,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default walletReducer;
