import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SummaryCards } from "./SummaryCards";

const mockMetrics = {
  totalBalance: 1299.5,
  cryptoBalance: 1.2456789,
  activeTransactionsCount: 3,
};

describe("SummaryCards Component", () => {
  it("should display the total balance formatted in CHF", () => {
    render(<SummaryCards metrics={mockMetrics} />);

    const balanceValue = screen.getByText(/1[.,’\s]?299[.,]50/);
    expect(balanceValue).toBeDefined();
    expect(screen.getByText(/Total Balance \(CHF\)/i)).toBeDefined();
  });

  it("should display the crypto assets with high decimal precision", () => {
    render(<SummaryCards metrics={mockMetrics} />);

    const cryptoValue = screen.getByText(/1\.24567890/);
    expect(cryptoValue).toBeDefined();
    expect(screen.getByText(/Crypto Assets \(BTC\)/i)).toBeDefined();
  });

  it("should display the correct number of active transactions", () => {
    render(<SummaryCards metrics={mockMetrics} />);

    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText(/Active Transactions/i)).toBeDefined();
  });

  it("should apply the profit color class to the total balance", () => {
    render(<SummaryCards metrics={mockMetrics} />);

    const balanceHeading = screen.getByText(/1[.,’\s]?299[.,]50/);
    expect(balanceHeading.className).toContain("text-emerald-400");
  });
});
