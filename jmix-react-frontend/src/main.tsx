import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "react-oidc-context";

import "./index.css";
import App from "./App";
import { oidcConfig } from "./services/auth/oidcConfig";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider {...oidcConfig}>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
