import { AnyAction } from 'redux';

const ADD_CURRENCIES = 'ADD_CURRENCIES';
const ADD_EXPENSE = 'ADD_EXPENSE';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    default:
      return state;
  }
};

export default walletReducer;
