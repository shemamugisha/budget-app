import { FC } from "react";
import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormat } from "../utils";

interface BudgetCardProps {
  name: string;
  amount: number;
  max: number;
  gray: string;
  onAddExpenseClick: () => void;
  viewExpenseClick: () => void;
}

const BudgetCard: FC<BudgetCardProps> = ({ name, amount, max, gray, onAddExpenseClick, viewExpenseClick }) => (
  <Card className={amount > max ? "bg-danger bg-opacity-10" : gray}>
    <Card.Body>
      <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
        <div className="me-2">{name}</div>
        <div className="d-flex align-items-baseline">
          {currencyFormat.format(amount)}
          {max && <span className="text-muted fs-6 ms-1">/ {currencyFormat.format(max)}</span>}
        </div>
      </Card.Title>

      {max && (
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
      )}

      <Stack direction="horizontal" gap={2} className="mt-4">
        <Button onClick={onAddExpenseClick} variant="outline-primary" className="ms-auto">
          Add Expense
        </Button>
        <Button onClick={viewExpenseClick} variant="outline-secondary">
          View Expenses
        </Button>
      </Stack>
    </Card.Body>
  </Card>
);

export default BudgetCard;

const getProgressBarVariant = (amount: number, max: number): string => {
  const ratio = amount / max;

  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
};
