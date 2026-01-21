import { describe, it, expect } from "vitest";
import {
  getRiskLevel,
  getAmountColor,
  RISK_STYLES,
  type RiskLevel,
} from "./riskAssessment";
import { THEME_COLORS } from "../constants/theme";

describe("riskAssessment", () => {
  describe("getRiskLevel", () => {
    describe("HIGH risk scenarios", () => {
      it("should return HIGH risk when amount is greater than 10000", () => {
        expect(getRiskLevel(10001, "COMPLETED")).toBe("HIGH");
        expect(getRiskLevel(50000, "COMPLETED")).toBe("HIGH");
        expect(getRiskLevel(100000, "PENDING")).toBe("HIGH");
      });

      it("should return HIGH risk when amount is negative and greater than 10000", () => {
        expect(getRiskLevel(-10001, "COMPLETED")).toBe("HIGH");
        expect(getRiskLevel(-50000, "PENDING")).toBe("HIGH");
      });

      it("should return HIGH risk when status is FAILED regardless of amount", () => {
        expect(getRiskLevel(0, "FAILED")).toBe("HIGH");
        expect(getRiskLevel(100, "FAILED")).toBe("HIGH");
        expect(getRiskLevel(5000, "FAILED")).toBe("HIGH");
      });

      it("should return HIGH risk when both amount > 10000 and status is FAILED", () => {
        expect(getRiskLevel(15000, "FAILED")).toBe("HIGH");
      });
    });

    describe("MEDIUM risk scenarios", () => {
      it("should return MEDIUM risk when amount is greater than 1000 and less than or equal to 10000", () => {
        expect(getRiskLevel(1001, "COMPLETED")).toBe("MEDIUM");
        expect(getRiskLevel(5000, "PENDING")).toBe("MEDIUM");
        expect(getRiskLevel(10000, "COMPLETED")).toBe("MEDIUM");
      });

      it("should return MEDIUM risk when negative amount is greater than 1000 and less than or equal to 10000", () => {
        expect(getRiskLevel(-1001, "COMPLETED")).toBe("MEDIUM");
        expect(getRiskLevel(-5000, "PENDING")).toBe("MEDIUM");
        expect(getRiskLevel(-10000, "COMPLETED")).toBe("MEDIUM");
      });
    });

    describe("LOW risk scenarios", () => {
      it("should return LOW risk when amount is less than 1000", () => {
        expect(getRiskLevel(0, "COMPLETED")).toBe("LOW");
        expect(getRiskLevel(100, "COMPLETED")).toBe("LOW");
        expect(getRiskLevel(999, "PENDING")).toBe("LOW");
      });

      it("should return LOW risk when negative amount is less than 1000", () => {
        expect(getRiskLevel(-100, "COMPLETED")).toBe("LOW");
        expect(getRiskLevel(-999, "PENDING")).toBe("LOW");
      });

      it("should return LOW risk for small amounts with non-FAILED status", () => {
        expect(getRiskLevel(500, "FLAGGED")).toBe("LOW");
        expect(getRiskLevel(100, "PENDING")).toBe("LOW");
        expect(getRiskLevel(50, "CANCELLED")).toBe("LOW");
      });
    });

    describe("edge cases", () => {
      it("should handle zero amount", () => {
        expect(getRiskLevel(0, "COMPLETED")).toBe("LOW");
      });

      it("should return HIGH for FAILED status even with small amounts", () => {
        expect(getRiskLevel(500, "FAILED")).toBe("HIGH");
        expect(getRiskLevel(100, "FAILED")).toBe("HIGH");
        expect(getRiskLevel(0, "FAILED")).toBe("HIGH");
      });

      it("should use absolute value for negative amounts", () => {
        expect(getRiskLevel(-15000, "COMPLETED")).toBe("HIGH");
        expect(getRiskLevel(-5000, "COMPLETED")).toBe("MEDIUM");
        expect(getRiskLevel(-500, "COMPLETED")).toBe("LOW");
        expect(getRiskLevel(-1000, "COMPLETED")).toBe("LOW");
      });

      it("should handle various status types", () => {
        expect(getRiskLevel(500, "COMPLETED")).toBe("LOW");
        expect(getRiskLevel(500, "PENDING")).toBe("LOW");
        expect(getRiskLevel(500, "CANCELLED")).toBe("LOW");
        expect(getRiskLevel(500, "FLAGGED")).toBe("LOW");
      });

      it("should handle boundary at exactly 1000", () => {
        expect(getRiskLevel(1000, "COMPLETED")).toBe("LOW");
        expect(getRiskLevel(-1000, "COMPLETED")).toBe("LOW");
      });
    });
  });

  describe("getAmountColor", () => {
    it("should return PROFIT color for positive amounts", () => {
      expect(getAmountColor(100)).toBe(THEME_COLORS.PROFIT);
      expect(getAmountColor(0.01)).toBe(THEME_COLORS.PROFIT);
      expect(getAmountColor(999999)).toBe(THEME_COLORS.PROFIT);
    });

    it("should return LOSS color for negative amounts", () => {
      expect(getAmountColor(-100)).toBe(THEME_COLORS.LOSS);
      expect(getAmountColor(-0.01)).toBe(THEME_COLORS.LOSS);
      expect(getAmountColor(-999999)).toBe(THEME_COLORS.LOSS);
    });

    it("should return PROFIT color for zero", () => {
      expect(getAmountColor(0)).toBe(THEME_COLORS.PROFIT);
    });

    it("should return correct theme color values", () => {
      expect(getAmountColor(1)).toBe("text-emerald-400");
      expect(getAmountColor(-1)).toBe("text-rose-400");
    });
  });

  describe("RISK_STYLES", () => {
    it("should contain all three risk level styles", () => {
      expect(RISK_STYLES).toHaveProperty("LOW");
      expect(RISK_STYLES).toHaveProperty("MEDIUM");
      expect(RISK_STYLES).toHaveProperty("HIGH");
    });

    it("should have correct styles for LOW risk", () => {
      expect(RISK_STYLES.LOW).toBe(
        "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      );
    });

    it("should have correct styles for MEDIUM risk", () => {
      expect(RISK_STYLES.MEDIUM).toBe(
        "text-amber-500 bg-amber-500/10 border-amber-500/20",
      );
    });

    it("should have correct styles for HIGH risk", () => {
      expect(RISK_STYLES.HIGH).toBe(
        "text-rose-500 bg-rose-500/10 border-rose-500/20",
      );
    });

    it("should all be strings", () => {
      Object.values(RISK_STYLES).forEach((style) => {
        expect(typeof style).toBe("string");
      });
    });
  });

  describe("RiskLevel type", () => {
    it("should accept valid risk levels", () => {
      const lowRisk: RiskLevel = "LOW";
      const mediumRisk: RiskLevel = "MEDIUM";
      const highRisk: RiskLevel = "HIGH";

      expect(lowRisk).toBe("LOW");
      expect(mediumRisk).toBe("MEDIUM");
      expect(highRisk).toBe("HIGH");
    });
  });
});
