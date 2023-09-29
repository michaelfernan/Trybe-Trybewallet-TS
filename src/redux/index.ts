import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import userReducer from './reducers/user';
import walletReducer from './reducers/wallet';

const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
