// core/errors/AppErrorFallback.tsx
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { HttpError } from "@/api";

export function AppErrorFallback({
                                     error,
                                     onRetry,
                                 }: {
    error: Error;
    onRetry?: () => void;
}) {
    const message =
        error instanceof HttpError
            ? error.response.details || error.response.error
            : error.message;

    return (
        <div className="flex align-items-center justify-content-center h-screen">
            <Card title="Error">
                <Message severity="error" text={message} />
                <Button
                    label="Reload"
                    icon="pi pi-refresh"
                    onClick={() => window.location.reload()}
                />
                {onRetry && (
                    <Button
                        label="Try again"
                        icon="pi pi-replay"
                        onClick={onRetry}
                        className="ml-2"
                    />
                )}
            </Card>
        </div>
    );
}
