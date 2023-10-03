export type Expense = {
  id: number;
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
  exchangeRates:ExchangeRateInfo;
};

export type GlobalState = {
  user: {
    email: '', // string que armazena o e-mail da pessoa usuária
  }
  wallet: {
    currencies: [], // array de string
    expenses:[Expense], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica se uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada
    totalExpenses: 0;
  },
};

export type ExchangeRateInfo = {

  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
  [key: string]: string;

};

export type Currency = {
  code: string;
  name: string;
  ask: string;
  [key: string]: any; // para cobrir as outras propriedades que não foram listadas
};
