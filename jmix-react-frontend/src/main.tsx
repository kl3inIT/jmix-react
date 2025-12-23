import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "@/services/auth";
import { QueryProvider } from "@/api";
import App from "./App";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PrimeReactProvider>
            <QueryProvider>
                <BrowserRouter>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </BrowserRouter>
            </QueryProvider>
        </PrimeReactProvider>
    </StrictMode>
);
