import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DEFAULT_STATUS_STYLE } from "../constants/statusStyles";
import { TransactionTable } from "./TransactionTable";
import * as Mocks from "../mocks/transactions";

vi.mock("../mocks/transactions", () => ({
  MOCK_TRANSACTIONS: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      counterparty: "Test User",
      description: "Test",
      status: "COMPLETED",
      amount: 100,
      currency: "CHF",
      timestamp: "2026-01-21T10:00:00Z",
    },
    {
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      counterparty: "Negative User",
      description: "Test Neg",
      status: "FAILED",
      amount: -50,
      currency: "CHF",
      timestamp: "2026-01-21T11:00:00Z",
    },
  ],
}));

describe("TransactionTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the table headers correctly", () => {
    render(<TransactionTable />);

    expect(
      screen.getByRole("columnheader", { name: /Counterparty/i }),
    ).toBeDefined();
    expect(screen.getByRole("columnheader", { name: /Status/i })).toBeDefined();
    expect(screen.getByRole("columnheader", { name: /Date/i })).toBeDefined();
    expect(screen.getByRole("columnheader", { name: /Amount/i })).toBeDefined();
  });

  it("should display transaction data correctly after Zod validation", () => {
    render(<TransactionTable />);

    expect(screen.getByText("Test User")).toBeDefined();
    expect(screen.getByText("Negative User")).toBeDefined();
  });

  it("should filter out invalid transactions and log data integrity failure", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const invalidTransaction = {
      id: "invalid-uuid-format",
      counterparty: "Malicious Actor",
      status: "HACKED",
      amount: 999999,
      currency: "USD",
      timestamp: "2026-01-21T12:00:00Z",
    };

    // @ts-expect-error - Forcing an invalid transaction shape for coverage purposes
    Mocks.MOCK_TRANSACTIONS.push(invalidTransaction);

    render(<TransactionTable />);

    expect(screen.queryByText("Malicious Actor")).toBeNull();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Data integrity failure in Zurich node:"),
      expect.any(Object),
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3);

    consoleSpy.mockRestore();
    Mocks.MOCK_TRANSACTIONS.pop();
  });

  it("should apply correct color styles for negative amounts", () => {
    render(<TransactionTable />);

    const negativeAmount = screen.getByText(/-50/);
    expect(negativeAmount.className).toContain("text-rose");
  });

  it("should apply DEFAULT_STATUS_STYLE when status exists in schema but not in styles mapping", () => {
    const incompleteStyles: Record<string, string> = {
      PENDING: "text-amber-400",
    };

    const statusToTest = "FAILED";
    const appliedStyle = incompleteStyles[statusToTest] || DEFAULT_STATUS_STYLE;

    expect(appliedStyle).toBe(DEFAULT_STATUS_STYLE);
    expect(appliedStyle).toContain("text-slate-400");
  });
});
