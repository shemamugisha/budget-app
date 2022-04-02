import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import { BudgetProvider } from "./context/BudgetContext";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <BudgetProvider>
            <App />
        </BudgetProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
