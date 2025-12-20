import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthCallback() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [auth.isAuthenticated, navigate]);

    if (auth.isLoading) {
        return <div>Completing login...</div>;
    }

    if (auth.error) {
        return <div>Auth error: {auth.error.message}</div>;
    }

    return null;
}
