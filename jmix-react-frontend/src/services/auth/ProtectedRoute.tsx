import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { ProgressSpinner } from "primereact/progressspinner";

export function ProtectedRoute() {
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            void auth.signinRedirect();
        }
    }, [auth]);

    if (auth.activeNavigator === "signinSilent") {
        return (
            <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
                <div className="text-center">
                    <ProgressSpinner />
                    <p className="mt-3 text-600">Đang đăng nhập...</p>
                </div>
            </div>
        );
    }

    if (auth.activeNavigator === "signoutRedirect") {
        return (
            <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
                <div className="text-center">
                    <ProgressSpinner />
                    <p className="mt-3 text-600">Đang đăng xuất...</p>
                </div>
            </div>
        );
    }

    if (auth.isLoading) {
        return (
            <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
                <div className="text-center">
                    <ProgressSpinner />
                    <p className="mt-3 text-600">Đang kiểm tra xác thực...</p>
                </div>
            </div>
        );
    }

    if (!auth.isAuthenticated) {
        return null;
    }

    return <Outlet />;
}
