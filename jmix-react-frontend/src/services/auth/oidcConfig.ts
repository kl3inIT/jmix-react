import type { AuthProviderProps } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";

export const oidcConfig: AuthProviderProps = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri: `${globalThis.location.origin}/auth/callback`,
    // scope: "openid profile email",
    // post_logout_redirect_uri: `${globalThis.location.origin}/logout/callback`,
    // // silent_redirect_uri: `${window.location.origin}/auth/silent-renew.html`,
    // response_type: "code",
    //
    // automaticSilentRenew: true,
    // loadUserInfo: true,
    // filterProtocolClaims: true,
    //
    // userStore: new WebStorageStateStore({
    //     store: globalThis.localStorage,
    // }),
};

console.log("OIDC Config:", {
    authority: oidcConfig.authority,
    client_id: oidcConfig.client_id,
    redirect_uri: oidcConfig.redirect_uri,
});
