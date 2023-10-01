export interface UserState {
  email: string;
}

export interface Expense {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: Record<string, ExchangeRateInfo>;
}

export interface RootState {
  user: UserState;
  wallet: {
    currencies: any;
    expenses: Expense[];
  };
}

export type GlobalState = {
  user: UserState;
  wallet: WalletState;
};

// types.ts

export interface ExchangeRateInfo {
  code: string;
  name: string;
  bid: number;
  // outras propriedades relevantes
}

export interface WalletState {
  currencies: string[];
  expenses: Expense[];
  editor: boolean;
  idToEdit: number;
  // Adicione as propriedades que faltam
}

export interface Currency {
  code: string;
  name: string;
  ask: string;
  [key: string]: any; // para cobrir as outras propriedades que não foram listadas
}
