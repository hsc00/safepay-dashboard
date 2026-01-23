import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "./ErrorBoundary";
import "@testing-library/jest-dom/vitest";

const ThrowError = ({ message = "Test error" }: { message?: string }) => {
  throw new Error(message);
};

const ValidComponent = () => <div>Valid content</div>;

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render children when there is no error", () => {
    render(
      <ErrorBoundary>
        <ValidComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Valid content")).toBeInTheDocument();
  });

  it("should display error UI when child component throws", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("should display default error message when error has no message", () => {
    const NoMessageError = () => {
      // This empty string is intentional to test the fallback UI logic
      throw new Error(""); // nosonar
    };

    render(
      <ErrorBoundary>
        <NoMessageError />
      </ErrorBoundary>,
    );

    expect(
      screen.getByText("An unexpected error occurred"),
    ).toBeInTheDocument();
  });

  it("should reset error state when try again button is clicked", async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <ValidComponent />
      </ErrorBoundary>,
    );

    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    await user.click(tryAgainButton);

    expect(screen.getByText("Valid content")).toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it("should log errors to console", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(console.error).toHaveBeenCalled();
  });
});
