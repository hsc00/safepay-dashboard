import { THEME_COLORS } from "../constants/theme";

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export const getRiskLevel = (amount: number, status: string): RiskLevel => {
  const absAmount = Math.abs(amount);

  if (absAmount > 10000 || status === "FAILED") return "HIGH";
  if (absAmount > 1000) return "MEDIUM";
  return "LOW";
};

export const RISK_STYLES = {
  LOW: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  MEDIUM: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  HIGH: "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

export const getAmountColor = (amount: number): string =>
  amount < 0 ? THEME_COLORS.LOSS : THEME_COLORS.PROFIT;
