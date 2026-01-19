import type { Currency } from "../types";

export const formatCurrency = (amount: number, currency: Currency): string => {
  const fractionDigits = currency === "BTC" ? 8 : 2;

  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
};

export const formatDate = (timestamp: string): string => {
  return new Intl.DateTimeFormat("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
};
