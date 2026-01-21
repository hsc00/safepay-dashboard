import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate } from "./formatters";
import type { Currency } from "../types";

describe("Utility Formatters", () => {
  describe("formatCurrency", () => {
    it("should format CHF correctly for the Swiss market", () => {
      const result = formatCurrency(1500.5, "CHF");
      expect(result).toMatch(/CHF\s?1[’\s]500\.50/);
    });

    it("should show exactly 8 decimal places for BTC", () => {
      const result = formatCurrency(0.0001234567, "BTC");
      expect(result).toContain("0.00012346");
    });

    it("should default to 2 decimal places for other currencies (e.g. EUR)", () => {
      const result = formatCurrency(100.555, "EUR" as Currency);
      expect(result).toContain("100.56");
    });

    it("should handle zero amount", () => {
      expect(formatCurrency(0, "CHF")).toContain("0.00");
    });

    it("should handle negative amounts correctly", () => {
      const result = formatCurrency(-450, "CHF");
      expect(result).toContain("-450.00");
    });
  });

  describe("formatDate", () => {
    it("should format ISO strings to Swiss date format (DD.MM.YYYY)", () => {
      const isoDate = "2026-01-19T22:30:00Z";
      const result = formatDate(isoDate);
      expect(result).toContain("19.01.2026");
    });

    it("should handle mid-day times in 24h format", () => {
      const isoDate = "2026-01-19T15:45:00Z";
      const result = formatDate(isoDate);
      expect(result).toContain("15:45");
      expect(result).not.toContain("PM");
    });

    it("should handle leap year dates", () => {
      const leapDate = "2024-02-29T10:00:00Z";
      expect(formatDate(leapDate)).toContain("29.02.2024");
    });
  });
});
