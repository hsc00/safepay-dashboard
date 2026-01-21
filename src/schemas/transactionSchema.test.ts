import { describe, it, expect } from "vitest";
import { TransactionSchema } from "./transactionSchema";

describe("TransactionSchema Unit Tests", () => {
  const validTransaction = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    counterparty: "Swiss Bank",
    description: "Salary",
    amount: 5000,
    currency: "CHF",
    status: "COMPLETED",
    timestamp: "2026-01-21T10:00:00Z",
  };

  it("should validate a correct transaction object", () => {
    const result = TransactionSchema.safeParse(validTransaction);
    expect(result.success).toBe(true);
  });

  it("should fail validation if ID is not a valid UUID", () => {
    const invalidData = { ...validTransaction, id: "tx_001" };
    const result = TransactionSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid UUID format");
    }
  });

  it("should coerce a string timestamp into a Date object", () => {
    const result = TransactionSchema.parse(validTransaction);
    expect(result.timestamp).toBeInstanceOf(Date);
    expect(result.timestamp.getFullYear()).toBe(2026);
  });

  it("should fail for unsupported currencies", () => {
    const invalidData = { ...validTransaction, currency: "YEN" };
    const result = TransactionSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should fail if amount is not a finite number", () => {
    const invalidData = { ...validTransaction, amount: Infinity };
    const result = TransactionSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should require a counterparty name", () => {
    const invalidData = { ...validTransaction, counterparty: "" };
    const result = TransactionSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
