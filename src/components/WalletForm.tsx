import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { addExpense as addExpenseAction, fetchAPIAndExchange } from '../redux/actions';

interface WalletFormProps {
  addExpense: (expenseData: {
    description: string;
    value: number;
    currency: string;
    method: string;
    tag: string;
    exchangeRates: Record<string, any>;
  }) => void;

  fetchCurrencies: () => Promise<void>;
}

interface WalletFormState {
  description: string;
  value: string;
  currency: string;
  method: string;
  tag: string;
  availableCurrencies: string[];
}

class WalletForm extends Component<WalletFormProps, WalletFormState> {
  constructor(props: WalletFormProps) {
    super(props);
    this.state = {
      description: '',
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      availableCurrencies: [],
    };
  }

  async componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();

    await this.fetchExchangeRates();
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleAddExpense = async (e: FormEvent) => {
    e.preventDefault();
    const { addExpense } = this.props;

    const { currency } = this.state;
    const { description, value, method, tag } = this.state;

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const exchangeRates = data[currency]?.ask || 1;

    console.log('Despesa adicionada:', {
      description,
      value: parseFloat(value),
      currency,
      method,
      tag,
      exchangeRates,
    });

    addExpense({
      description,
      value: parseFloat(value),
      currency,
      method,
      tag,
      exchangeRates,
    });

    this.setState({
      description: '',
      value: '',
    });
  };

  async fetchExchangeRates() {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      if (!response.ok) {
        throw new Error('Não foi possível buscar as moedas.');
      }
      const data = await response.json();

      this.setState({
        availableCurrencies: Object.keys(data).filter((c) => c !== 'USDT'),
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { description, value, currency, method, tag, availableCurrencies } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleAddExpense }>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleInputChange }
              data-testid="description-input"
            />
          </label>
          <label>
            Valor:
            <input
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleInputChange }
              data-testid="value-input"
            />
          </label>
          <label>
            Moeda:
            <select
              name="currency"
              value={ currency }
              onChange={ this.handleInputChange }
              data-testid="currency-input"
            >
              {availableCurrencies.map((currencyKey) => (
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
              value={ method }
              onChange={ this.handleInputChange }
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
              value={ tag }
              onChange={ this.handleInputChange }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="submit" data-testid="add-expense-button">
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    expenses: state.expenses, // Substitua "state.expenses" pela chave adequada em seu estado Redux
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    async addExpense(data: any) {
      return dispatch(addExpenseAction(data));
    },
    async fetchCurrencies() {
      const result = await dispatch(fetchAPIAndExchange());
      return result;
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
