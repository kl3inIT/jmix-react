let resolveAccessToken: (() => Promise<string>) | undefined;

export function registerAccessToken(
    token: () => Promise<string>
) {
    resolveAccessToken = token;
}

export async function getAccessToken(): Promise<string> {
    if (!resolveAccessToken) {
        throw new Error("Access token resolver has not been registered");
    }
    return resolveAccessToken();
}
