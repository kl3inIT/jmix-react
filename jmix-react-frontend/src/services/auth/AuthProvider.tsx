import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { AuthProvider as OidcProvider, useAuth } from "react-oidc-context";

import { oidcConfig } from "./oidcConfig";
import { registerAccessToken } from "./accessTokenProvider";

// neu token doi thi tu dong renew token cho axious
function AccessTokenRegistration()  {
    const auth = useAuth();

    useEffect(() => {
        registerAccessToken(async () => {
            const token = auth.user?.access_token;

            if (!token) {
                throw new Error("Access token is not available");
            }

            return token;
        });
    }, [auth.user]);

    return null;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
    return (
        <OidcProvider {...oidcConfig}>
            <AccessTokenRegistration />
            {children}
        </OidcProvider>
    );
};
