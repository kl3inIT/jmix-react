import {type PropsWithChildren, useEffect } from "react";
import { useAuth } from "react-oidc-context";

export function ProtectedRoute({ children }: PropsWithChildren) {
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            void auth.signinRedirect();
        }
    }, [auth]);

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Checking authentication...</div>;
    }

    if (!auth.isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
