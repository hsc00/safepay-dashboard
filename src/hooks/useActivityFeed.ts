import { useState, useEffect } from "react";
import { MOCK_TRANSACTIONS } from "../mocks/transactions";
import {
  TransactionSchema,
  type Transaction,
} from "../schemas/transactionSchema";

const REFRESH_INTERVAL_MS = 8000;
const MAX_VISIBLE_TRANSACTIONS = 15;
const PRICE_VARIATION_PERCENTAGE = 0.05;
const EUR_TO_CHF_RATE = 1.05;

const INVALID_BALANCE_STATUSES = new Set(["CANCELLED", "FAILED", "FLAGGED"]);

const getSecureRandomIndex = (limit: number): number => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % limit;
};

const validateItem = (rawData: unknown): Transaction | null => {
  const result = TransactionSchema.safeParse(rawData);
  if (!result.success) {
    console.error("Data integrity failure in Zurich node:", result.error);
    return null;
  }
  return result.data;
};

const initializeTransactions = (): Transaction[] => {
  return MOCK_TRANSACTIONS.map(validateItem)
    .filter((item): item is Transaction => item !== null)
    .slice(0, MAX_VISIBLE_TRANSACTIONS);
};

export const useActivityFeed = (interval = REFRESH_INTERVAL_MS) => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    initializeTransactions,
  );
  const [totalProcessedCount, setTotalProcessedCount] = useState(
    () => initializeTransactions().length,
  );

  const chfBalance = transactions.reduce((acc, current) => {
    if (INVALID_BALANCE_STATUSES.has(current.status)) return acc;

    switch (current.currency) {
      case "CHF":
        return acc + current.amount;
      case "EUR":
        return acc + current.amount * EUR_TO_CHF_RATE;
      default:
        return acc;
    }
  }, 0);

  const cryptoBalance = transactions
    .filter(
      (tx) => tx.currency === "BTC" && !INVALID_BALANCE_STATUSES.has(tx.status),
    )
    .reduce((acc, current) => acc + current.amount, 0);

  // Live Feed
  useEffect(() => {
    const activityInterval = setInterval(() => {
      const randomIndex = getSecureRandomIndex(MOCK_TRANSACTIONS.length);
      const baseTemplate = MOCK_TRANSACTIONS[randomIndex];

      const randomBuffer = new Uint8Array(1);
      crypto.getRandomValues(randomBuffer);
      const isPositiveVariation = randomBuffer[0] > 127;

      const priceVariation = isPositiveVariation
        ? 1 + PRICE_VARIATION_PERCENTAGE
        : 1 - PRICE_VARIATION_PERCENTAGE;

      const rawNewTransaction = {
        ...baseTemplate,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        amount: baseTemplate.amount * priceVariation,
      };

      const validatedTransaction = validateItem(rawNewTransaction);

      if (validatedTransaction) {
        setTransactions((previous) => {
          const updatedList = [validatedTransaction, ...previous];
          return updatedList.slice(0, MAX_VISIBLE_TRANSACTIONS);
        });

        setTotalProcessedCount((prev) => prev + 1);
      }
    }, interval);

    return () => clearInterval(activityInterval);
  }, [interval]);

  return {
    transactions,
    metrics: {
      totalBalance: chfBalance,
      cryptoBalance,
      activeTransactionsCount: totalProcessedCount,
    },
  };
};
