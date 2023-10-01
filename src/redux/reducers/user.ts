import { AnyAction } from 'redux';
import { ActionTypes } from '../actions';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_USER_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default userReducer;
