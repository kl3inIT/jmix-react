import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorFallback } from "@/components";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
        // TODO: Gửi lên Sentry/LogRocket nếu có
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <ErrorFallback error={this.state.error!} onRetry={this.handleRetry} />
                )
            );
        }

        return this.props.children;
    }
}

