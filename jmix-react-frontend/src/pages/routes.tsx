import { Routes, Route } from "react-router-dom";

import DashBoard from "@/pages/dashboard/DashBoard";
import AuthCallback from "@/pages/AuthCallback";
import { ProtectedRoute } from "@/services/auth/";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <DashBoard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
