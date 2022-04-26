import { FC } from "react";
import { currencyFormat } from "../utils";
import { Modal, Button, Stack } from "react-bootstrap";
import { useBudget, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";

interface Props {
  handleClose: () => void;
  budgetId: string | null;
}

const ViewExpense: FC<Props> = ({ handleClose, budgetId }) => {
  const { getBudgetExpense, budgets, deleteBudget, deleteExpense } = useBudget();

  const expenses = getBudgetExpense(budgetId!);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget ? budget.id : "0");
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap={2} key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">{currencyFormat.format(expense.amount)}</div>
              <Button onClick={() => deleteExpense(expense.id)} size="sm" variant="outline-danger">
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpense;
