import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, updateTotalExpense } from '../redux/actions';
import { GlobalState } from '../Type';

function ExpenseTable() {
  const expenses = useSelector((state: GlobalState) => state.wallet.expenses);
  const dispatch = useDispatch();

  const handleDelete = (id: number, convertedValue: number) => {
    dispatch(deleteItem(id));
    dispatch(updateTotalExpense(convertedValue));
  };

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
              <td>{`${parseFloat(expense.value).toFixed(2)} ${expense.currency}`}</td>
              <td>{`${expense.exchangeRates[expense.currency].name}/Real Brasileiro`}</td>
              <td>
                {`${parseFloat(expense.exchangeRates[
                  expense.currency].ask).toFixed(2)} BRL`}

              </td>
              <td>
                {`${(Number(expense.exchangeRates[
                  expense.currency].ask) * Number(expense.value)).toFixed(2)} BRL`}

              </td>
              <td>Real</td>
              <td>
                <button>Editar</button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => {
                    handleDelete(
                      expense.id,
                      Number(
                        expense.exchangeRates[expense.currency].ask,
                      ) * Number(expense.value),
                    );
                  } }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ExpenseTable;
