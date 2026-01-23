import { describe, it, expect } from "vitest";
import * as Mocks from "./transactions";
import { TransactionSchema } from "../schemas/transactionSchema";
import { z } from "zod";

describe("Mocks Integrity via Zod Schema", () => {
  it("should ensure all global mocks pass the TransactionSchema", () => {
    Mocks.MOCK_TRANSACTIONS.forEach((transaction) => {
      const result = TransactionSchema.safeParse(transaction);

      if (!result.success) {
        console.error(
          `Mock ID ${transaction.id} failed validation:`,
          z.treeifyError(result.error),
        );
      }

      expect(result.success).toBe(true);
    });
  });

  it("should validate COMPLETED transactions specifically", () => {
    const { COMPLETED_TRANSACTION } = Mocks;
    const result = TransactionSchema.parse(COMPLETED_TRANSACTION);

    expect(result.status).toBe("COMPLETED");
    expect(result.amount).toBeGreaterThan(0);
    expect(result.timestamp).toBe("2026-01-19T10:00:00Z");
  });

  it("should validate FLAGGED transactions for compliance and EUR currency", () => {
    const { FLAGGED_TRANSACTION } = Mocks;
    const result = TransactionSchema.parse(FLAGGED_TRANSACTION);

    expect(result.status).toBe("FLAGGED");
    expect(result.currency).toBe("EUR");
    expect(result.amount).toBe(50000);
  });

  it("should validate the structure of a crypto PENDING transaction", () => {
    const { PENDING_CRYPTO_TRANSACTION } = Mocks;
    const result = TransactionSchema.parse(PENDING_CRYPTO_TRANSACTION);

    expect(result.currency).toBe("BTC");
    expect(result.status).toBe("PENDING");
    expect(typeof result.amount).toBe("number");
  });

  it("should ensure the global mock array contains all status types and valid UUIDs", () => {
    const transactions = Mocks.MOCK_TRANSACTIONS;
    const statuses = transactions.map((t) => t.status);

    const expectedStatuses = [
      "COMPLETED",
      "PENDING",
      "FLAGGED",
      "CANCELLED",
      "FAILED",
    ];

    expectedStatuses.forEach((status) => {
      expect(statuses).toContain(status);
    });

    const ids = transactions.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(transactions.length);
  });
});
