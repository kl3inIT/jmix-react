import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "@/services/auth";
import { QueryProvider } from "@/api";
import "./index.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css


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
