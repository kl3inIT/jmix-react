import { Routes, Route } from "react-router-dom";

import AuthCallback from "@/pages/AuthCallback";
import UserPage from "@/pages/user/UserPage";
import { ProtectedRoute } from "@/services/auth";
import { AppLayout, ErrorBoundary, NotFoundPage } from "@/components";

export default function AppRoutes() {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/auth/callback" element={<AuthCallback />} />

                <Route element={<ProtectedRoute />}>
                    {/* Layout wrapper - AppLayout render Outlet */}
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<div className="text-2xl">Dashboard - Coming soon</div>} />
                        <Route path="/user" element={<UserPage />} />
                    </Route>
                </Route>

                {/* 404 Not Found */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ErrorBoundary>
    );
}
