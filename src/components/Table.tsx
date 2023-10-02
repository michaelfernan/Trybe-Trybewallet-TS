import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Type';

function ExpenseTable() {
  const expenses = useSelector((state: RootState) => state.wallet.expenses);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => {
          return (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{`${expense.value} ${expense.currency}`}</td>
              <td>Real Brasileiro</td>
              <td>{`${expense.exchangeRates} BRL`}</td>
              <td>
                {`${(
                  Number(expense.exchangeRates) * Number(expense.value)).toFixed(2)} BRL`}

              </td>

              <td>Real</td>
              <td>
                <button>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ExpenseTable;
