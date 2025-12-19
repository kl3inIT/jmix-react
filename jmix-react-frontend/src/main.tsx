import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {BrowserRouter} from "react-router";
import {AuthProvider, type TAuthConfig, type TRefreshTokenExpiredEvent} from "react-oauth2-code-pkce"

const authConfig: TAuthConfig = {
    clientId: 'jmix-react',

    authorizationEndpoint:
        'http://xacthuc.quanluc.bqp/realms/internal-realm/protocol/openid-connect/auth',

    tokenEndpoint:
        'http://xacthuc.quanluc.bqp/realms/internal-realm/protocol/openid-connect/token',

    logoutEndpoint:
        'http://xacthuc.quanluc.bqp/realms/internal-realm/protocol/openid-connect/logout',

    redirectUri: 'http://localhost:5173/',

    decodeToken: false,
    onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => globalThis.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
}

createRoot(document.getElementById('root')!).render(
    <AuthProvider authConfig={authConfig}>
        <StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </StrictMode>
    </AuthProvider>,
);
