// types.ts

export interface UserState {
  email: string;
}

export interface Expense {
  id: number;
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
  exchangeRates: any;
}

export interface WalletState {
  currencies: string[];
  expenses: Expense[];
  editor: boolean;
  idToEdit: number;
}

export interface RootState {
  user: UserState;
  wallet: WalletState;
}
