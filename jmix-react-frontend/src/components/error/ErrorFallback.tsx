import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { HttpError } from "@/api";

interface ErrorFallbackProps {
    error: Error;
    onRetry?: () => void;
}

export function ErrorFallback({ error, onRetry }: Readonly<ErrorFallbackProps>) {
    const isHttpError = error instanceof HttpError;
    const message = isHttpError ? error.userMessage() : error.message;

    const footer = (
        <div className="flex gap-2 justify-content-center">
            <Button
                label="Tải lại trang"
                icon="pi pi-refresh"
                severity="secondary"
                onClick={() => window.location.reload()}
            />
            {onRetry && (
                <Button label="Thử lại" icon="pi pi-replay" onClick={onRetry} />
            )}
        </div>
    );

    return (
        <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
            <Card
                title={
                    <div className="flex align-items-center gap-2 justify-content-center">
                        <i className="pi pi-exclamation-circle text-red-500 text-2xl" />
                        <span>Đã xảy ra lỗi</span>
                    </div>
                }
                footer={footer}
                className="w-full md:w-25rem shadow-3"
            >
                <Message severity="error" text={message} className="w-full" />
            </Card>
        </div>
    );
}

