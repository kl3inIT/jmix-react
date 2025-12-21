import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
} from "@tanstack/react-query"
import React, { useState } from "react"

function createQueryClient() {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => {
                console.error("React Query error:", error)
            },
        }),
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                retry: 2,
                staleTime: 30_000, // 30s
            },
        },
    })
}

export function QueryProvider({ children }: Readonly<React.PropsWithChildren>) {
    const [queryClient] = useState(createQueryClient)

    return (
        <QueryClientProvider client={queryClient}>
            {children}

            {/*{process.env.NODE_ENV === "development" && (*/}
            {/*    <ReactQueryDevtools*/}
            {/*        initialIsOpen={false}*/}
            {/*        position="bottom-right"*/}
            {/*    />*/}
            {/*)}*/}
        </QueryClientProvider>
    )
}
