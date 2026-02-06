import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getCurrentYear,
  add,
  isWithinRange,
  isDateBefore,
  isSameDay,
  getHolidays,
  isHoliday,
} from "../dateUtils";

describe("getCurrentYear", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-01"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the current year", () => {
    expect(getCurrentYear()).toBe(2026);
  });
});

describe("add", () => {
  it("adds days to a date", () => {
    const date = new Date("2026-01-01");
    const result = add(date, 5, "days");
    expect(result.getDate()).toBe(6);
  });

  it("throws on invalid amount", () => {
    expect(() => add(new Date(), NaN, "days")).toThrow();
  });

  it("returns the original date for invalid type", () => {
    const date = new Date("2026-01-01");
    const result = add(date, 1, "bananas" as any);

    expect(result).toEqual(date);
  });
});

describe("isWithinRange", () => {
  it("returns true when date is inside range", () => {
    const date = new Date("2026-01-10");
    expect(
      isWithinRange(
        date,
        new Date("2026-01-01"),
        new Date("2026-01-31")
      )
    ).toBe(true);
  });

  it("throws if from > to", () => {
    expect(() =>
      isWithinRange(
        new Date(),
        new Date("2026-02-01"),
        new Date("2026-01-01")
      )
    ).toThrow();
  });
});

describe("isDateBefore", () => {
  it("returns true if date is before compareDate", () => {
    expect(
      isDateBefore(new Date("2026-01-01"), new Date("2026-01-02"))
    ).toBe(true);
  });
});

describe("isSameDay", () => {
  it("returns true for same calendar day", () => {
    expect(
      isSameDay(
        new Date("2026-01-01T10:00"),
        new Date("2026-01-01T23:59")
      )
    ).toBe(true);
  });
});

describe("getHolidays", () => {
  it("returns holidays for a year", async () => {
    const holidays = await getHolidays(2026);
    expect(Array.isArray(holidays)).toBe(true);
    expect(holidays.length).toBeGreaterThan(0);
  });
});

describe("isHoliday", () => {
  it("returns true for a holiday date", async () => {
    const result = await isHoliday(new Date("2026-12-25"));
    expect(result).toBe(true);
  });
});