import { Component, type ErrorInfo, type ReactNode } from "react";
import { Ic } from "./Ic";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Ignite] Unhandled error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "16px",
            color: "var(--text)",
            fontFamily: "var(--font)",
            textAlign: "center",
            padding: "24px",
          }}
        >
          <Ic name="warning-circle" style={{ fontSize: "48px", color: "var(--red-alert)" }} />
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)" }}>Something went wrong</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "38ch" }}>
            An unexpected error occurred. Refreshing the page usually fixes it.
          </p>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
