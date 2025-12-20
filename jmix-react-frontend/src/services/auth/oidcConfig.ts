import type { AuthProviderProps } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";

// Removes OIDC params from URL, but doesn't remove other params that might be present
export function createUriWithoutSsoParams() {
    // state, code and session_state are from keycloak. realm is added by us to indicate which realm the user is signing in to.
    const SSO_SEARCH_PARAMS = ["state", "code", "session_state", "realm"];

    const searchParams = new URLSearchParams(globalThis.location.search);

    SSO_SEARCH_PARAMS.forEach((param) => searchParams.delete(param));

    return searchParams.toString().length > 0
        ? `${globalThis.location.origin}?${searchParams.toString()}`
        : globalThis.location.origin;
}


export const oidcConfig: AuthProviderProps = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri: `${globalThis.location.origin}/auth/callback`,
    scope: "openid profile email",
    // post_logout_redirect_uri: `${globalThis.location.origin}/logout/callback`,
    // // silent_redirect_uri: `${window.location.origin}/auth/silent-renew.html`,
    // loadUserInfo: true,
    // filterProxtocolClaims: true,
    //
    onSigninCallback: () => {
        // Remove OIDC params from URL, but don't remove other params that might be present
        const searchParams = new URLSearchParams(globalThis.location.search);
        searchParams.delete("state");
        searchParams.delete("code");
        searchParams.delete("session_state");
        const newUrl = searchParams.toString().length
            ? `${globalThis.location.pathname}?${searchParams.toString()}`
            : globalThis.location.pathname;
        globalThis.history.replaceState({}, document.title, newUrl);
    },
    userStore: new WebStorageStateStore({ store: globalThis.localStorage }),
};
