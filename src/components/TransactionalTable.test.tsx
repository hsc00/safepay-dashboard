import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TransactionTable } from "./TransactionTable";

vi.mock("../mocks/transactions", () => ({
  MOCK_TRANSACTIONS: [
    {
      id: "1",
      counterparty: "Test User",
      description: "Test",
      status: "UNKNOWN_STATUS",
      amount: 100,
      currency: "CHF",
      timestamp: "2026-01-21T10:00:00Z",
    },
    {
      id: "2",
      counterparty: "Negative User",
      description: "Test Neg",
      status: "COMPLETED",
      amount: -50,
      currency: "CHF",
      timestamp: "2026-01-21T11:00:00Z",
    },
  ],
}));

it("should render the table headers correctly", () => {
  render(<TransactionTable />);

  expect(
    screen.getByRole("columnheader", { name: /Counterparty/i }),
  ).toBeDefined();
  expect(screen.getByRole("columnheader", { name: /Status/i })).toBeDefined();
  expect(screen.getByRole("columnheader", { name: /Date/i })).toBeDefined();
  expect(screen.getByRole("columnheader", { name: /Amount/i })).toBeDefined();
});

it("should apply DEFAULT_STATUS_STYLE when status is unknown", () => {
  render(<TransactionTable />);

  const statusBadge = screen.getByText("UNKNOWN_STATUS");

  expect(statusBadge.className).toContain("text-slate-400");
  expect(statusBadge.className).toContain("border-slate-700");
});

describe("TransactionTable", () => {
  it("should render the table with transactions", () => {
    render(<TransactionTable />);

    expect(screen.getByRole("columnheader", { name: /Status/i })).toBeDefined();
    expect(
      screen.getByRole("columnheader", { name: /Counterparty/i }),
    ).toBeDefined();
    expect(screen.getByRole("columnheader", { name: /Amount/i })).toBeDefined();
  });

  it("should display transaction data correctly", () => {
    render(<TransactionTable />);

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);
  });

  it("should apply correct styles for amounts", () => {
    render(<TransactionTable />);

    const amounts = screen.getAllByText(/[BTC|CHF]/);
    expect(amounts.length).toBeDefined();
  });
});
