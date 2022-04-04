import { FC, useState } from "react";
import { Container, Button, Stack } from "react-bootstrap";
import { BudgetCard, AddBudget } from "./components";
import { useBudget } from "./context/BudgetContext";

const App: FC = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);

  const { budgets, expenses, getBudgetExpense } = useBudget();

  console.log(budgets);

  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
          Add Budget
        </Button>
        <Button variant="outline-primary">Add Expense</Button>
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

            return <BudgetCard key={id} gray="bg-light" name={name} amount={amount} max={max} />;
          })}
      </div>
      <AddBudget show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
    </Container>
  );
};

export default App;
