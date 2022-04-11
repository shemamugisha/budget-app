import { FC, FormEvent, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudget, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";

interface Props {
  show: boolean;
  handleClose: () => void;
  defaultBudgetId: string;
}

const AddExpense: FC<Props> = ({ show, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef<HTMLInputElement>(null!);
  const amountRef = useRef<HTMLInputElement>(null!);
  const budgetIdRef = useRef<HTMLSelectElement>(null!);

  const { addExpense, budgets } = useBudget();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addExpense({
      id: uuid(),
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type="number" required min={0} step={0.01} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpense;
