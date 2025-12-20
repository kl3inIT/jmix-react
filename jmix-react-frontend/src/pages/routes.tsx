import { Routes, Route } from "react-router";
import LoginPage from "@/pages/login/LoginPage";
import DashBoard from "@/pages/dashboard/DashBoard";
import { withAuthenticationRequired } from "react-oidc-context";

const ProtectedDashboard = withAuthenticationRequired(DashBoard, {
    OnRedirecting: () => <div>Redirecting to login...</div>,
});

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedDashboard />} />
        </Routes>
    );
}
