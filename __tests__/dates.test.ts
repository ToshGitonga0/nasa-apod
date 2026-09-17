import {
  APOD_START_DATE,
  addDays,
  formatDateISO,
  getRandomApodDate,
  isBeforeApodStart,
  isFutureDate,
  isValidDateString,
  parseIsoDateUtc,
} from "@/lib/dates";

describe("formatDateISO / parseIsoDateUtc", () => {
  it("round-trips a date without shifting it", () => {
    const original = "2024-03-01";
    const parsed = parseIsoDateUtc(original);
    expect(formatDateISO(parsed)).toBe(original);
  });
});

describe("addDays", () => {
  it("adds days forward", () => {
    expect(addDays("2024-02-28", 1)).toBe("2024-02-29"); // leap year
  });

  it("subtracts days backward", () => {
    expect(addDays("2024-03-01", -1)).toBe("2024-02-29");
  });

  it("handles year boundaries", () => {
    expect(addDays("2023-12-31", 1)).toBe("2024-01-01");
  });
});

describe("isFutureDate", () => {
  it("treats tomorrow as future", () => {
    const tomorrow = addDays(formatDateISO(new Date()), 1);
    expect(isFutureDate(tomorrow)).toBe(true);
  });

  it("treats today as not future", () => {
    const today = formatDateISO(new Date());
    expect(isFutureDate(today)).toBe(false);
  });
});

describe("isBeforeApodStart", () => {
  it("rejects dates before APOD began", () => {
    expect(isBeforeApodStart("1990-01-01")).toBe(true);
  });

  it("accepts the start date itself", () => {
    expect(isBeforeApodStart(APOD_START_DATE)).toBe(false);
  });
});

describe("isValidDateString", () => {
  it("accepts well-formed dates", () => {
    expect(isValidDateString("2020-01-01")).toBe(true);
  });

  it("rejects malformed strings", () => {
    expect(isValidDateString("not-a-date")).toBe(false);
    expect(isValidDateString("2020/01/01")).toBe(false);
  });
});

describe("getRandomApodDate", () => {
  it("always returns a date within the valid APOD range", () => {
    for (let i = 0; i < 25; i += 1) {
      const date = getRandomApodDate();
      expect(isValidDateString(date)).toBe(true);
      expect(isBeforeApodStart(date)).toBe(false);
      expect(isFutureDate(date)).toBe(false);
    }
  });
});
