import { FC, useState } from "react";
import { Container, Button, Stack } from "react-bootstrap";
import { BudgetCard, AddBudget, AddExpense, ViewExpense } from "./components";
import { useBudget } from "./context/BudgetContext";

const App: FC = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setViewExpenseModal] = useState<string | null>(null);
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState("");

  const { budgets, getBudgetExpense } = useBudget();

  const openExpenseModal = (budgetId: string) => {
    setShowAddExpenseModal(true);
    setAddExpenseBudgetId(budgetId);
  };

  console.log("budget idddd", addExpenseBudgetId);

  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
          Add Budget
        </Button>
        <Button variant="outline-primary" onClick={() => openExpenseModal(addExpenseBudgetId)}>
          Add Expense
        </Button>
      </Stack>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {budgets &&
          budgets.map(({ max, name, id }) => {
            const amount = getBudgetExpense(id).reduce((total, expense) => total + expense.amount, 0);
            console.log("iddd", id);
            return (
              <BudgetCard
                key={id}
                onAddExpenseClick={() => openExpenseModal(id)}
                gray="bg-light"
                name={name}
                amount={amount}
                max={max}
                viewExpenseClick={() => setViewExpenseModal(id)}
              />
            );
          })}
      </div>
      <AddBudget show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpense
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseBudgetId}
      />
      <ViewExpense budgetId={showViewExpenseModal} handleClose={() => setViewExpenseModal(null)} />
    </Container>
  );
};

export default App;
