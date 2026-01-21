import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SummaryCards } from "./SummaryCards";

vi.mock("../mocks/transactions", () => ({
  MOCK_TRANSACTIONS: [
    { id: "1", amount: 1000, currency: "CHF", status: "COMPLETED" },
    { id: "2", amount: -200.5, currency: "CHF", status: "COMPLETED" },
    { id: "3", amount: 500, currency: "CHF", status: "COMPLETED" },
  ],
}));

describe("SummaryCards", () => {
  it("should calculate and display the total balance correctly using reduce", () => {
    render(<SummaryCards />);

    const balanceValue = screen.getByText(/1[’\s]299\.50/);
    expect(balanceValue).toBeDefined();
  });

  it("should display the crypto assets card with 8 decimal places", () => {
    render(<SummaryCards />);

    expect(screen.getByText(/1\.24567890/)).toBeDefined();
    expect(screen.getByText(/Crypto Assets \(BTC\)/i)).toBeDefined();
  });

  it("should display the correct number of active transactions", () => {
    render(<SummaryCards />);

    const count = screen.getByText("3");
    expect(count).toBeDefined();
    expect(screen.getByText(/Active Transactions/i)).toBeDefined();
  });

  it("should have the correct emerald color class for positive balance", () => {
    render(<SummaryCards />);
    const balanceHeading = screen.getByText(/1[’\s]299\.50/);
    expect(balanceHeading.className).toContain("text-emerald-400");
  });
});
