import { FC, createContext, useContext } from "react";
import { BudgetContextState, IBudget, IExpense } from "../types";
import { useLocalStorage } from "../hooks";
export const initialState: BudgetContextState = {
  expenses: [{ id: "ww$ww", description: "", amount: 0, budgetId: "29392" }],
  budgets: [{ max: 1000, name: "Savings", id: "iii2$" }],
  addExpense: () => {},
  addBudget: () => {},
  deleteBudget: () => {},
  deleteExpense: () => {},
  getBudgetExpense: () => [],
};

export const BudgetContext = createContext<BudgetContextState>(initialState);

export function useBudget() {
  return useContext(BudgetContext);
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const BudgetProvider: FC = ({ children }) => {
  const [expenses, setExpenses] = useLocalStorage("expense", initialState.expenses);

  const [budgets, setBudgets] = useLocalStorage("budgets", initialState.budgets);

  const addExpense = (newExpense: IExpense) => {
    const expenseObj: IExpense = {
      id: newExpense.id,
      amount: newExpense.amount,
      description: newExpense.description,
      budgetId: newExpense.budgetId,
    };

    setExpenses([...expenses, expenseObj]);
  };

  const addBudget = (newBudget: IBudget) => {
    if (budgets.find((budget) => budget.name === newBudget.name)) return budgets;

    const BudgetObj: IBudget = {
      id: newBudget.id,
      max: newBudget.max,
      name: newBudget.name,
    };

    setBudgets([...budgets, BudgetObj]);
  };

  const getBudgetExpense = (budgetId: string) => expenses.filter((expense) => budgetId === expense.budgetId);

  const deleteBudget = (id: string) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.id !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudget) => prevBudget.filter((budget) => budget.id !== id));
  };

  const deleteExpense = (id: string) =>
    setExpenses((prevExpense) => prevExpense.filter((expense) => expense.id !== id));

  return (
    <BudgetContext.Provider
      value={{ expenses, budgets, addExpense, addBudget, getBudgetExpense, deleteBudget, deleteExpense }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
