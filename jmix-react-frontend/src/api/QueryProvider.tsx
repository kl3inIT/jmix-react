import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
    MutationCache,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { HttpError } from "./HttpError";
import { toast } from "react-toastify";

const RETRY_COUNT = 2;

function createQueryClient() {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => {
                // Logging only (Sentry / console)
                if (error instanceof HttpError) {
                    console.error(
                        "[QueryError]",
                        error.status,
                        error.code,
                        error.request?.url
                    );
                } else {
                    console.error("[UnknownQueryError]", error);
                }
            },
        }),

        mutationCache: new MutationCache({
            onError: (error) => {
                if (error instanceof HttpError) {
                    toast.error(error.userMessage());
                }
            },
        }),

        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                staleTime: 30_000, // 30s

                retry: (failureCount, error) => {
                    if (!(error instanceof HttpError)) return false;
                    if (failureCount >= RETRY_COUNT) return false;

                    // Retry ONLY recoverable errors
                    if ([502, 503, 504].includes(error.status)) return true;

                    // Network error (no response)
                    if (error.status === 0) return true;

                    return false;
                },

                onError: (error) => {
                    if (!(error instanceof HttpError)) return;

                    // Hard error → let ErrorBoundary handle
                    if (error.isHard()) {
                        throw error;
                    }

                    // Soft error → notify user
                    toast.error(error.userMessage());
                },
            },
        },
    });
}

export function QueryProvider({
                                  children,
                              }: Readonly<React.PropsWithChildren>) {
    const [queryClient] = useState(createQueryClient);

    return (
        <QueryClientProvider client={queryClient}>
            {children}

            {/* Devtools chỉ bật khi dev */}
            {/* {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )} */}
        </QueryClientProvider>
    );
}
