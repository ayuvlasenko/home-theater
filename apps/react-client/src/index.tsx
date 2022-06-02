import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { AuthProvider } from "./auth";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const container = document.getElementById("root");
if ( container === null ) {
    throw new Error("container is null");
}

const root = createRoot(container);
root.render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
