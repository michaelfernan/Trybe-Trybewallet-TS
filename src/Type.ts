export type UserState = {
  email: string;
};

export type Expense = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: Record<string, ExchangeRateInfo>;
};

export type RootState = {
  user: UserState;
  wallet: {
    currencies: [];
    expenses: Expense[];
  };
};

export type GlobalState = {
  user: UserState;
  wallet: WalletState;
};


export type ExchangeRateInfo = {
  code: string;
  name: string;
  bid: number;
  // outras propriedades relevantes
};

export type WalletState = {
  currencies: [];
  expenses: Expense[];
  editor: boolean;
  idToEdit: number;
  // Adicione as propriedades que faltam
};

export type Currency = {
  code: string;
  name: string;
  ask: string;
  [key: string]: any; // para cobrir as outras propriedades que não foram listadas
};
