import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate } from "./formatters";

describe("Utility Formatters", () => {
  it("should format CHF correctly for the Swiss market", () => {
    const result = formatCurrency(1500.5, "CHF");
    expect(result).toContain("CHF");
    expect(result).toContain("1");
    expect(result).toContain("500.50");
  });

  it("should show exactly 8 decimal places for BTC", () => {
    const result = formatCurrency(0.0001234567, "BTC");
    expect(result).toContain("0.00012346");
  });

  it("should handle negative amounts correctly", () => {
    const result = formatCurrency(-450, "CHF");
    expect(result).toContain("-450.00");
  });

  it("should format ISO strings to Swiss date format", () => {
    const isoDate = "2026-01-19T22:30:00Z";
    const result = formatDate(isoDate);

    expect(result).toContain("19.01.2026");
    expect(result).toMatch(/\d{2}\.\d{2}\.\d{4}/);
  });

  it("should include time in 24h format", () => {
    const isoDate = "2026-01-19T15:45:00Z";
    const result = formatDate(isoDate);
    expect(result).toMatch(/\d{2}:\d{2}/);
  });
});
