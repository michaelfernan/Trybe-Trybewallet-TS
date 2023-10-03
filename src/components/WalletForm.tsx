import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense as addExpenseAction, fetchAPIAndExchange } from '../redux/actions';
import { WalletFormState } from '../Type'; // Ajuste o caminho para o arquivo onde esses tipos estão definidos

function WalletForm() {
  const [state, setState] = useState<WalletFormState>({
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    availableCurrencies: [],
  });

  const currencies = useSelector((state: any) => state.wallet.currencies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAPIAndExchange());
  }, [dispatch]);

  useEffect(() => {
    if (currencies && currencies.length > 0) {
      setState((prevState) => ({
        ...prevState,
        availableCurrencies: currencies.filter((c: string) => c !== 'USDT'),
      }));
    }
  }, [currencies]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddExpense = async (e: FormEvent) => {
    e.preventDefault();
    const { value, currency, method, tag, description } = state;

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const exchangeRates = data;

    dispatch(addExpenseAction({
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    }));

    setState({
      ...state,
      description: '',
      value: '',
    });
  };

  return (
    <div>
      <form onSubmit={ handleAddExpense }>
        <label>
          Valor:
          <input
            type="number"
            name="value"
            value={ state.value }
            onChange={ handleInputChange }
            data-testid="value-input"
          />
        </label>
        <label>
          Moeda:
          <select
            name="currency"
            value={ state.currency }
            onChange={ handleInputChange }
            data-testid="currency-input"
          >
            {state.availableCurrencies.map((currencyKey) => (
              <option key={ currencyKey } value={ currencyKey }>
                {currencyKey}
              </option>
            ))}
          </select>
        </label>
        <label>
          Método de Pagamento:
          <select
            name="method"
            value={ state.method }
            onChange={ handleInputChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label>
          Categoria:
          <select
            name="tag"
            value={ state.tag }
            onChange={ handleInputChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label>
          Descrição:
          <input
            type="text"
            name="description"
            value={ state.description }
            onChange={ handleInputChange }
            data-testid="description-input"
          />
        </label>
        <button type="submit" data-testid="add-expense-button">
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}

export default WalletForm;
