import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "@/services/auth";
import { QueryProvider } from "@/api";

import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryProvider>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </QueryProvider>
    </StrictMode>
);
