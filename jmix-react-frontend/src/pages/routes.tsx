import { Routes, Route } from "react-router-dom";

import DashBoard from "@/pages/dashboard/DashBoard";
import AuthCallback from "@/pages/AuthCallback";
import UserPage from "@/pages/user/UserPage.tsx";
import { ProtectedRoute } from "@/services/auth";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route
                path="/user"
                element={
                    <ProtectedRoute>
                        <UserPage />
                    </ProtectedRoute>
                }
            />

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
