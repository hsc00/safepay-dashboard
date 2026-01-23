import type { Transaction } from "../schemas/transactionSchema";

export type { Transaction } from "../schemas/transactionSchema";
export type Currency = Transaction["currency"];
export type TransactionStatus = Transaction["status"];
