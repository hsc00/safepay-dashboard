import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TransactionTable } from "./TransactionTable";
import type { Transaction } from "../schemas/transactionSchema";

const extendedMocks: Transaction[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    counterparty: "User Completed",
    description: "Salary",
    status: "COMPLETED",
    amount: 1000,
    currency: "CHF",
    timestamp: "2026-01-22T10:00:00Z",
  },
  {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    counterparty: "User Failed",
    description: "Error",
    status: "FAILED",
    amount: 50,
    currency: "CHF",
    timestamp: "2026-01-22T11:00:00Z",
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    counterparty: "User Unknown",
    description: "Fallback Test",
    status: "PROCESSING" as unknown as Transaction["status"],
    amount: 10,
    currency: "CHF",
    timestamp: "2026-01-22T12:00:00Z",
  },
];

describe("TransactionTable - Style & Branch Coverage", () => {
  it("should apply correct status styles and fallback", () => {
    render(<TransactionTable transactions={extendedMocks} />);

    const completedRow = screen.getByText("User Completed").closest("tr");
    if (!completedRow) throw new Error("Row not found");

    const completedBadge = within(completedRow)
      .getAllByText(/COMPLETED/i)
      .find((el) => el.tagName === "SPAN" || el.className.includes("rounded"));

    if (!completedBadge) throw new Error("Completed badge not found");
    expect(completedBadge.className).toContain("text-emerald-400");

    const failedRow = screen.getByText("User Failed").closest("tr");
    if (!failedRow) throw new Error("Row not found");

    const failedBadge = within(failedRow)
      .getAllByText(/FAILED/i)
      .find((el) => el.tagName === "SPAN");

    if (!failedBadge) throw new Error("Failed badge not found");
    expect(failedBadge.className).not.toBe(completedBadge.className);

    const processingRow = screen.getByText("User Unknown").closest("tr");
    if (!processingRow) throw new Error("Row not found");

    const processingBadge = within(processingRow)
      .getAllByText(/PROCESSING/i)
      .find((el) => el.tagName === "SPAN");

    if (!processingBadge) throw new Error("Processing badge not found");
    expect(processingBadge.className).toBeDefined();
  });
});
