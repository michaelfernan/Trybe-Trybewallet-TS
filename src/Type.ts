export type Expense = {
  id: number;
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
  exchangeRates: { [key: string]: Currency };
};

export type GlobalState = {
  user: {
    email: '',
  }
  wallet: {
    currencies: [],
    expenses:[Expense],
    editor: false,
    idToEdit: 0,
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
  [key: string]: any; };

export type WalletFormState = {
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
  availableCurrencies: string[];
};
