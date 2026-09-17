/**
 * The normalized shape of a NASA APOD API response that the rest of the
 * app relies on. Deliberately small and flat — this is a tiny project.
 */
export type ApodMediaType = "image" | "video";

export type ApodResponse = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  mediaType: ApodMediaType;
  copyright?: string;
  serviceVersion?: string;
};

export type ApodApiError = {
  error: string;
};
