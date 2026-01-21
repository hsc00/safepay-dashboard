import { z } from "zod";
import { TransactionSchema } from "../schemas/transactionSchema";

type Transaction = z.infer<typeof TransactionSchema>;
type Currency = Transaction["currency"];

export const formatCurrency = (amount: number, currency: Currency): string => {
  const isCrypto = currency === "BTC" || currency === "ETH";

  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: currency as string,
    minimumFractionDigits: isCrypto ? 8 : 2,
    maximumFractionDigits: isCrypto ? 8 : 2,
  };

  try {
    return new Intl.NumberFormat("de-CH", options).format(amount);
  } catch {
    const value = amount.toLocaleString("de-CH", {
      minimumFractionDigits: isCrypto ? 8 : 2,
      maximumFractionDigits: isCrypto ? 8 : 2,
    });
    return `${value} ${currency}`;
  }
};

export const formatDate = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);

  return new Intl.DateTimeFormat("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};
