import { describe, it, expect, vi } from "vitest";
import { formatCurrency, formatDate } from "./formatters";

describe("Utility Formatters (Zod-aligned)", () => {
  describe("formatCurrency", () => {
    it("should format CHF correctly with Swiss thousands separator", () => {
      const result = formatCurrency(1500.5, "CHF");

      expect(result).toMatch(/1[’'\s]500\.50/);
      expect(result).toContain("CHF");
    });

    it("should show high precision (8 decimal places) for BTC", () => {
      const result = formatCurrency(0.0001234567, "BTC");

      expect(result).toContain("0.00012346");
      expect(result).toContain("BTC");
    });

    it("should handle EUR with standard 2 decimal places", () => {
      const result = formatCurrency(100.555, "EUR");
      expect(result).toContain("100.56");
    });

    it("should handle negative amounts using Swiss formatting", () => {
      const result = formatCurrency(-450, "CHF");
      expect(result).toContain("-450.00");
    });

    it("should cover both crypto and fiat fallback paths in the catch block", () => {
      const numberFormatSpy = vi
        .spyOn(Intl, "NumberFormat")
        .mockImplementation(() => {
          throw new Error("Force catch block");
        });

      const cryptoResult = formatCurrency(1.2345678912, "BTC");
      expect(cryptoResult).toContain("1.23456789");

      const fiatResult = formatCurrency(1.234567, "CHF");
      expect(fiatResult).toContain("1.23");

      numberFormatSpy.mockRestore();
    });
  });

  describe("formatDate", () => {
    it("should format Date objects to Swiss format (DD.MM.YYYY)", () => {
      const date = new Date("2026-01-19T22:30:00Z");
      const result = formatDate(date);

      expect(result).toContain("19.01.2026");
      expect(result).toContain("22:30");
    });

    it("should still handle ISO strings for backward compatibility/flexibility", () => {
      const isoDate = "2026-01-21T10:00:00Z";
      const result = formatDate(isoDate);
      expect(result).toContain("21.01.2026");
    });

    it("should use 24h format consistently", () => {
      const date = new Date("2026-01-19T15:45:00Z");
      const result = formatDate(date);
      expect(result).toContain("15:45");
      expect(result).not.toContain("PM");
      expect(result).not.toContain("AM");
    });
  });
});
