import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useActivityFeed } from "./useActivityFeed";
import { MOCK_TRANSACTIONS } from "../mocks/transactions";

type UUID = `${string}-${string}-${string}-${string}-${string}`;

vi.mock("../mocks/transactions", () => ({
  MOCK_TRANSACTIONS: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      amount: 100,
      currency: "CHF",
      status: "COMPLETED",
      counterparty: "Z",
      description: "D",
      timestamp: "2026-01-22T10:00:00Z",
    },
    {
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      amount: 100,
      currency: "EUR",
      status: "COMPLETED",
      counterparty: "B",
      description: "D",
      timestamp: "2026-01-22T10:05:00Z",
    },
    {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      amount: 1,
      currency: "BTC",
      status: "COMPLETED",
      counterparty: "W",
      description: "D",
      timestamp: "2026-01-22T10:10:00Z",
    },
  ],
}));

describe("useActivityFeed", () => {
  let mockRandomValues: number[] = [];

  beforeEach(() => {
    vi.useFakeTimers().setSystemTime("2026-01-22T19:00:00Z");

    mockRandomValues = [];

    vi.stubGlobal("crypto", {
      randomUUID: () => "550e8400-e29b-41d4-a716-446655440000" as UUID,
      getRandomValues: (array: Uint32Array | Uint8Array) => {
        for (let i = 0; i < array.length; i++) {
          array[i] =
            mockRandomValues.shift() ?? Math.floor(Math.random() * 255);
        }
        return array;
      },
    });

    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("should calculate balance correctly (CHF + EUR conversion)", () => {
    const { result } = renderHook(() => useActivityFeed());
    expect(result.current.metrics.totalBalance).toBe(205);
    expect(result.current.metrics.cryptoBalance).toBe(1);
    expect(result.current.transactions.length).toBe(3);
  });

  it("should cover the invalid transaction branch in the interval", () => {
    const { result, unmount } = renderHook(() => useActivityFeed(1000));
    const countBefore = result.current.metrics.activeTransactionsCount;

    const originalCurrencies = MOCK_TRANSACTIONS.map((t) => t.currency);
    MOCK_TRANSACTIONS.forEach((t) => {
      (t as { currency: unknown }).currency = "INVALID";
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.metrics.activeTransactionsCount).toBe(countBefore);

    MOCK_TRANSACTIONS.forEach((t, i) => {
      (t as { currency: unknown }).currency = originalCurrencies[i];
    });
    unmount();
  });

  it("should cover price variation branches", () => {
    const { result, unmount } = renderHook(() => useActivityFeed(1000));
    const baseCount = result.current.metrics.activeTransactionsCount;

    mockRandomValues = [0, 200];
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    mockRandomValues = [1, 50];
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.metrics.activeTransactionsCount).toBe(baseCount + 2);
    unmount();
  });

  it("should cleanup interval and apply MAX_VISIBLE_TRANSACTIONS", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const { result, unmount } = renderHook(() => useActivityFeed(10));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.transactions.length).toBeLessThanOrEqual(15);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
