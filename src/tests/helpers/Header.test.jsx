import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; // Importe o Provider do react-redux
import configureMockStore from 'redux-mock-store'; // Importe o redux-mock-store
import Header from '../../components/Header';

const mockStore = configureMockStore(); // Crie um mock store

test('Header component displays user email and total expenses', () => {
  const initialState = {
    user: {
      email: 'test@example.com',
    },
    wallet: {
      totalExpenses: 100.0,
    },
  };

  const store = mockStore(initialState); // Passe o estado inicial para o mock store

  render(
    <Provider store={ store }>
      {' '}
      {/* Envolve o componente com o Provider */}
      <Header />
    </Provider>,
  );

  const emailElement = screen.getByTestId('email-field');
  const totalExpensesElement = screen.getByTestId('total-field');

  expect(emailElement).toHaveTextContent('test@example.com');
  expect(totalExpensesElement).toHaveTextContent('100.00'); // Ajuste conforme necessário
});
