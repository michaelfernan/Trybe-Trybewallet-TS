import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Header from '../../components/Header';

const mockStore = configureMockStore();

test('Header component displays user email and total expenses', () => {
  const initialState = {
    user: {
      email: 'test@example.com',
    },
    wallet: {
      totalExpenses: 100.0,
    },
  };

  const store = mockStore(initialState);

  render(
    <Provider store={ store }>
      <Header />
    </Provider>,
  );

  const emailElement = screen.getByTestId('email-field');
  const totalExpensesElement = screen.getByTestId('total-field');

  expect(emailElement).toHaveTextContent('test@example.com');
  expect(totalExpensesElement).toHaveTextContent('100.00');
});
