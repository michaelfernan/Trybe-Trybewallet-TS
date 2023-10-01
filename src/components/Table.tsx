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
          const currentExchangeRate = expense.exchangeRates[expense.currency]?.bid || 1;

          return (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{parseFloat(expense.value).toFixed(2)}</td>
              <td>
                {expense.exchangeRates[expense.currency]?.name || expense.currency}
                /Real Brasileiro
              </td>
              <td>
                {typeof currentExchangeRate === 'number'
                  ? currentExchangeRate.toFixed(2) : ''}
              </td>
              <td>
                {(parseFloat(expense.value) * currentExchangeRate).toFixed(2)}
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
