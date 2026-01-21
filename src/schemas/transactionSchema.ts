import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.uuid({ message: "Invalid UUID format" }),
  counterparty: z.string().min(1),
  description: z.string(),
  amount: z.number().refine((num) => Number.isFinite(num)),

  currency: z.enum(["CHF", "BTC", "ETH", "USD", "EUR"]),

  status: z.enum(["COMPLETED", "PENDING", "FAILED", "FLAGGED", "CANCELLED"]),

  timestamp: z.coerce.date(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
