import { FC } from "react";
import { Container, Button, Stack } from "react-bootstrap";
import { BudgetCard } from "./components";

const App: FC = () => {
    return (
        <Container className="my-4">
            <Stack direction="horizontal" gap={2} className="mb-4">
                <h1 className="me-auto">Budgets</h1>
                <Button variant="primary">Add Budget</Button>
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
                <BudgetCard gray="bg-light" name="Savings" amount={48000} max={40000} />
            </div>
        </Container>
    );
};

export default App;
