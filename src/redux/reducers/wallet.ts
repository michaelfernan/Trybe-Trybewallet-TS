import { AnyAction } from 'redux';
import { ActionTypes } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.ADD_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      };
    case ActionTypes.ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case ActionTypes.DELETE_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case ActionTypes.EDIT_EXPENSE:
      return {
        ...state,
        editor: true,
        idToEdit: action.payload.id,
      };
    case ActionTypes.SAVE_EDITED_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((
          expense: any,
        ) => (state.idToEdit === expense.id
          ? { ...expense, ...action.payload } : expense)),
        editor: false,
      };
    default:
      return state;
  }
};

export default walletReducer;
