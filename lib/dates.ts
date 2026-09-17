/**
 * Small, dependency-free helpers for working with APOD's calendar dates.
 *
 * Everything here operates on plain "YYYY-MM-DD" strings and UTC-based
 * Date objects, specifically to avoid the classic bug where a local
 * timezone conversion silently shifts a date by one day.
 */

// NASA's Astronomy Picture of the Day began on 1995-06-16.
export const APOD_START_DATE = "1995-06-16";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDateString(value: string): boolean {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }
  const parsed = parseIsoDateUtc(value);
  return !Number.isNaN(parsed.getTime());
}

/** Parses a "YYYY-MM-DD" string as a UTC midnight Date, avoiding local-time shifts. */
export function parseIsoDateUtc(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
}

/** Formats a Date as a "YYYY-MM-DD" string, using its UTC calendar fields. */
export function formatDateISO(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Today's calendar date, in UTC, as "YYYY-MM-DD". */
export function getTodayISO(): string {
  return formatDateISO(new Date());
}

/** Adds (or subtracts, for negative values) whole days to a "YYYY-MM-DD" string. */
export function addDays(dateString: string, amount: number): string {
  const date = parseIsoDateUtc(dateString);
  date.setUTCDate(date.getUTCDate() + amount);
  return formatDateISO(date);
}

/** True if `dateString` falls after today's calendar date (UTC). */
export function isFutureDate(dateString: string): boolean {
  return parseIsoDateUtc(dateString).getTime() > parseIsoDateUtc(getTodayISO()).getTime();
}

/** True if `dateString` falls before APOD's first published date. */
export function isBeforeApodStart(dateString: string): boolean {
  return parseIsoDateUtc(dateString).getTime() < parseIsoDateUtc(APOD_START_DATE).getTime();
}

/**
 * Picks a uniformly random valid APOD date between APOD_START_DATE and
 * today (inclusive of both ends).
 */
export function getRandomApodDate(): string {
  const start = parseIsoDateUtc(APOD_START_DATE).getTime();
  const end = parseIsoDateUtc(getTodayISO()).getTime();
  const msPerDay = 24 * 60 * 60 * 1000;
  const totalDays = Math.round((end - start) / msPerDay);
  const offset = Math.floor(Math.random() * (totalDays + 1));
  return formatDateISO(new Date(start + offset * msPerDay));
}
