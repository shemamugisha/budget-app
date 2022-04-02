import { FC, createContext, useState, useContext } from "react";
import { BudgetContextState, IBudget, IExpense } from "../types";
import { v4 as uuid } from "uuid";

const initialState: BudgetContextState = {
  expenses: [{ id: "", description: "", amount: "" }],
  budgets: [{ max: 1000, name: "Savings", id: "" }],
  addExpense: () => {},
  addBudget: () => {},
  deleteBudget: () => {},
  deleteExpense: () => {},
  getBudgetExpense: () => {},
};

export const BudgetContext = createContext<BudgetContextState>(initialState);


export function useBudget() {
  return useContext(BudgetContext)
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"



export const BudgetProvider: FC = ({ children }) => {
  const [expenses, setExpenses] = useState(initialState.expenses);
  const [budgets, setBudgets] = useState(initialState.budgets);

  const addExpense = (newExpense: IExpense) => {
    const expenseObj: IExpense = {
      id: uuid(),
      amount: newExpense.amount,
      description: newExpense.description,
    };

    setExpenses([...expenses, expenseObj]);
  };

  const addBudget = (newBudget: IBudget) => {
    if (budgets.find((budget) => budget.name === newBudget.name)) return budgets;

    const BudgetObj: IBudget = {
      id: uuid(),
      max: newBudget.max,
      name: newBudget.name,
    };

    setBudgets([...budgets, BudgetObj]);
  };

  const getBudgetExpense = (budgetId: string) => expenses.filter((expense) => expense.id === budgetId);

  const deleteBudget = (id: string) => {
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if (expense.id !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })


    setBudgets((prevBudget) => prevBudget.filter((budget) => budget.id !== id));
  };

  const deleteExpense = (id: string) => setExpenses((prevExpense) => prevExpense.filter((expense) => expense.id !== id))

  return (
    <BudgetContext.Provider
      value={{ expenses, budgets, addExpense, addBudget, getBudgetExpense, deleteBudget, deleteExpense }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
