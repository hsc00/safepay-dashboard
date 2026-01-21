import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./components/SummaryCards", () => ({
  SummaryCards: () => <div data-testid="mock-summary-cards" />,
}));

vi.mock("./components/TransactionTable", () => ({
  TransactionTable: () => <div data-testid="mock-transaction-table" />,
}));

describe("App Component", () => {
  it("should render the main title correctly", () => {
    render(<App />);
    const titleElement = screen.getByText(/SAFEPAY TERMINAL/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("should render sub-components through the layout", () => {
    render(<App />);

    expect(screen.getByTestId("mock-summary-cards")).toBeInTheDocument();
    expect(screen.getByTestId("mock-transaction-table")).toBeInTheDocument();
  });

  it("should apply the main background style", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass("bg-slate-950");
  });
});
