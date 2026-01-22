import type { Transaction } from "../types";

export const COMPLETED_TRANSACTION: Transaction = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  amount: 1500.5,
  currency: "CHF",
  status: "COMPLETED",
  counterparty: "Swiss Gas & Electric",
  description: "Utility Payment",
  timestamp: "2026-01-19T10:00:00Z",
};

export const PENDING_CRYPTO_TRANSACTION: Transaction = {
  id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  amount: 0.05,
  currency: "BTC",
  status: "PENDING",
  counterparty: "External Wallet",
  description: "Crypto Transfer",
  timestamp: "2026-01-19T11:30:00Z",
};

export const FLAGGED_TRANSACTION: Transaction = {
  id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  amount: 50000,
  currency: "EUR",
  status: "FLAGGED",
  counterparty: "Unknown Entity",
  description: "High Value Alert",
  timestamp: "2026-01-19T12:00:00Z",
};

export const CANCELLED_TRANSACTION: Transaction = {
  id: "f47ac10b-58af-4331-a897-0e02b2c3d980",
  amount: -450,
  currency: "CHF",
  status: "CANCELLED",
  counterparty: "Utility Zurich AG",
  description: "Manual reversal by user",
  timestamp: "2026-01-19T10:15:00Z",
};

export const FAILED_TRANSACTION: Transaction = {
  id: "a17af42a-17ab-4331-a897-0e02a4f3d980",
  amount: 120,
  currency: "CHF",
  status: "FAILED",
  counterparty: "Starbucks Zurich",
  description: "Insufficient Funds",
  timestamp: "2026-01-19T09:00:00Z",
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  COMPLETED_TRANSACTION,
  PENDING_CRYPTO_TRANSACTION,
  FLAGGED_TRANSACTION,
  CANCELLED_TRANSACTION,
  FAILED_TRANSACTION,
];
