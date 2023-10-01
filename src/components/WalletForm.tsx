import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, addCurrencies } from '../redux/actions';
import { RootState, Currency, ExchangeRateInfo } from '../Type';

function WalletForm() {
  const expenses = useSelector((state: RootState) => state.wallet.expenses);

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('BRL');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const [currenciesData, setCurrenciesData,
  ] = useState<Record<string, ExchangeRateInfo>>({});

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/all');
        if (!response.ok) {
          throw new Error('Erro ao buscar cotações.');
        }
        const data = await response.json();
        delete data.USDT;

        // Já que seu estado espera um Record e não um array, nós não precisamos convertê-lo para array
        setCurrenciesData(data as Record<string, ExchangeRateInfo>);

        dispatch(addCurrencies(data));
      } catch (error) {
        console.error('Erro ao buscar cotações:', error);
      }
    };

    fetchCurrencies();
  }, [dispatch]);

  const handleAddExpense = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(
      addExpense({
        id: getNextId(),
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: currenciesData,
      }),
    );

    // Limpa os campos após adicionar a despesa
    setValue('');
    setDescription('');
  };

  const getNextId = (): number => {
    if (!expenses || expenses.length === 0) return 0;
    return expenses[expenses.length - 1].id + 1;
  };

  return (
    <form>
      <input
        data-testid="value-input"
        type="number"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
      />
      <input
        data-testid="description-input"
        type="text"
        value={ description }
        onChange={ (e) => setDescription(e.target.value) }
      />
      <select
        data-testid="currency-input"
        value={ currency }
        onChange={ (e) => setCurrency(e.target.value) }
      >
        {Object.keys(currenciesData).map((currencyKey) => (
          <option key={ currencyKey } value={ currencyKey }>
            {currencyKey}
          </option>
        ))}
      </select>

      <select
        data-testid="method-input"
        value={ method }
        onChange={ (e) => setMethod(e.target.value) }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <select
        data-testid="tag-input"
        value={ tag }
        onChange={ (e) => setTag(e.target.value) }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button onClick={ handleAddExpense }>Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
