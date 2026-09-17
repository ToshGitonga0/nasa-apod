import type { ApodResponse } from "@/lib/types";
import { getTodayISO, isBeforeApodStart, isFutureDate, isValidDateString } from "@/lib/dates";

const NASA_APOD_ENDPOINT = "https://api.nasa.gov/planetary/apod";

type RawApodResponse = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
  service_version?: string;
};

/** Normalizes NASA's raw (snake_case, loosely-typed) response into our ApodResponse. */
export function normalizeApod(raw: RawApodResponse): ApodResponse {
  if (!raw || typeof raw !== "object") {
    throw new Error("Malformed response from NASA's APOD API.");
  }

  const { date, title, explanation, url, media_type: mediaType } = raw;

  if (!date || !title || !explanation || !url) {
    throw new Error("NASA's APOD API returned an incomplete response.");
  }

  const normalizedMediaType = mediaType === "video" ? "video" : "image";

  return {
    date,
    title,
    explanation,
    url,
    hdurl: raw.hdurl,
    mediaType: normalizedMediaType,
    copyright: raw.copyright,
    serviceVersion: raw.service_version,
  };
}

/**
 * Fetches (and normalizes) the Astronomy Picture of the Day for a given
 * calendar date, defaulting to today. Server-side only — this is where
 * the NASA API key is used, so it never reaches the browser.
 */
export async function fetchApod(date?: string): Promise<ApodResponse> {
  const targetDate = date && date.length > 0 ? date : getTodayISO();

  if (!isValidDateString(targetDate)) {
    throw new Error(`"${targetDate}" is not a valid date.`);
  }
  if (isFutureDate(targetDate)) {
    throw new Error("Cannot fetch an Astronomy Picture of the Day from the future.");
  }
  if (isBeforeApodStart(targetDate)) {
    throw new Error("NASA's Astronomy Picture of the Day did not exist yet on that date.");
  }

  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const url = `${NASA_APOD_ENDPOINT}?api_key=${encodeURIComponent(apiKey)}&date=${encodeURIComponent(targetDate)}`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("NASA's API rate limit was reached. Please try again shortly.");
    }
    throw new Error("NASA's APOD API is currently unavailable.");
  }

  const raw = (await response.json()) as RawApodResponse;
  return normalizeApod(raw);
}
