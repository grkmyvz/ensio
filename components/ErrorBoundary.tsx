"use client";

import { Component, ReactNode } from "react";
import Alert from "@/components/Alert";
import { appConfig } from "@/lib/config/app";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (appConfig.isDevelopment) {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
          <div className="max-w-md w-full">
            <Alert
              type="error"
              title="Something went wrong"
              message={
                this.state.error?.message ||
                "An unexpected error occurred. Please refresh the page."
              }
            />
            <button
              onClick={() => window.location.reload()}
              className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
