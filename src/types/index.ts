export interface IExpense {
  id: string;
  description: string;
  amount: number;
}

export interface IBudget {
  id: string;
  name: string;
  max: number;
}

export type BudgetContextState = {
  expenses: IExpense[];
  budgets: IBudget[];
  getBudgetExpense: (id: string) => IExpense[];
  addExpense: (expense: IExpense) => void;
  addBudget: (budget: IBudget) => void;
  deleteBudget: (id: string) => void;
  deleteExpense: (id: string) => void;
};
